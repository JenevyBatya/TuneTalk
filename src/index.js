import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import Root from './App';

import './fonts/static/Jost-Light.ttf';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import register from "./registerServiceWorker";


const { REACT_APP_BUGSNAG_API_KEY } = process.env.REACT_APP_BUGSNAG_API_KEY;

Bugsnag.start({
    apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()]
});


const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
const root = ReactDOM.createRoot(document.getElementById('root'));

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);
            })
            .catch((error) => {
                console.error("Service Worker registration failed:", error);
            });
    });
}


root.render(

    <ErrorBoundary>
        <Provider store={store}>
            <Root />
        </Provider>
    </ErrorBoundary>

);
register();

