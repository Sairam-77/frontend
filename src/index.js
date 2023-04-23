import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Notifications } from '@mantine/notifications';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
       <Notifications position="top-right"/>
      <App />
    </Provider> 
  // </React.StrictMode>
);


