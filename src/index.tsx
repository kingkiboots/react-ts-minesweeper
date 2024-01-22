import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from './layouts/App';

const rootElement = document.getElementById('root') as HTMLElement;
const contentElement = <App />;
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, contentElement);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(contentElement);
}

reportWebVitals();
