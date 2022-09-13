import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
<React.StrictMode>
  <App />
</React.StrictMode>, 
document.getElementById('root')
);
//ReactDOM.render prima 2 argumenta: HTML code i HTML element
//<App /> je komponenta: sluzi kao nezavisni dio koda, slicno kao funcija ali radi u izolaciji i vraca HTML