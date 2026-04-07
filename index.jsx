import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';
import { ToastProvider } from './src/components/toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ToastProvider><App /></ToastProvider>);