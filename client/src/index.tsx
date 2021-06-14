import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import { Provider } from 'react-redux';
import { rootStore } from './store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={rootStore}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
