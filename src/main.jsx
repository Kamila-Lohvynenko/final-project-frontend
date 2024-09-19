import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'modern-normalize';
import './index.css';

import { persistor, store } from './redux/store.js';
import { App } from './components/App.jsx';
import { AxiosInterceptor } from './components/AxiosInterceptor/AxiosInterceptor.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AxiosInterceptor />
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
    ,
  </React.StrictMode>,
);
