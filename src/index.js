import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './Store/store'
import { Provider } from 'react-redux';
import { FormDataProvider } from './Context/FormDataContext';
createRoot(document.getElementById('root')).render(<Fragment> <BrowserRouter><FormDataProvider><Provider store={store}><App/></Provider></FormDataProvider></BrowserRouter> </Fragment>);