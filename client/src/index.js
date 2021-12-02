import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { Slide } from '@material-ui/core';

ReactDOM.render(
    <SnackbarProvider
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        TransitionComponent={Slide}
    >
        <App />
    </SnackbarProvider>,
    document.getElementById('root'),
);
