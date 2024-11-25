import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import reportWebVitals from './reportWebVitals';
import App from "./App";
import './fonts/static/Jost-Light.ttf'

Bugsnag.start({
    apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
});
const root = ReactDOM.createRoot(document.getElementById('root'));
const ErrorBoundary =
    Bugsnag.getPlugin('react').createErrorBoundary(React);
root.render(
    <ErrorBoundary>
            <App/>
    </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
