import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Make sure to import your Redux store
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap the App component with the Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
