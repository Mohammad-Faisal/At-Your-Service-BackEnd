import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import { Provider } from 'react-redux';
import { rootStore } from './store';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={rootStore}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
