import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import ConfigureOrdersStore from './hooks-store/order-store';
import configurePortfolioStore from './hooks-store/portfolio-store';
import configurePriceStore from './hooks-store/price-store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ConfigureOrdersStore();
configurePortfolioStore();
configurePriceStore();
//<BrowserRouter basename='/melowise/burger'>
// is for production.
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/ladderstock'>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
