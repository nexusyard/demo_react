import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Routes } from'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Routes>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Routes>
  </Provider>
);