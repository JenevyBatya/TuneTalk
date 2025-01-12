import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {App} from "./App";
import './fonts/static/Jost-Light.ttf'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
const {REACT_APP_BUGSNAG_API_KEY} = process.env

Bugsnag.start({
    apiKey: REACT_APP_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()]
})


const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
        <ErrorBoundary>
        <App/>
        </ErrorBoundary>
    // , document.getElementById('app')
    // </React.StrictMode>
);

