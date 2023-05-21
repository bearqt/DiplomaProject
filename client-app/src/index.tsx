import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StoreContext, store } from './stores/store';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>

);
