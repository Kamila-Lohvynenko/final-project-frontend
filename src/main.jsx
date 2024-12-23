// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'modern-normalize';
import './index.css';
import './i18n.js';

import { persistor, store } from './redux/store.js';
import { App } from './components/App.jsx';
import TourSteps from './onboarding/onbordingStep.jsx';

// import { AxiosInterceptor } from './components/AxiosInterceptor/AxiosInterceptor.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <AxiosInterceptor /> */}
        <TourSteps>
        <App />
        </TourSteps>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
