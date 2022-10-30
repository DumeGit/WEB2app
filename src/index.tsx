import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.Fragment>
      <Auth0Provider
          domain="dev-yu44jhhit6qht4m5.us.auth0.com"
          clientId="DWJhaG0kjTARTtBz0i9zkyoPLFk5BOaX"
          redirectUri={window.location.origin}
      >
          <App />
      </Auth0Provider>,
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
