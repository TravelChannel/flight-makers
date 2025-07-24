
import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './Store/store'
import { Provider } from 'react-redux';
import { FormDataProvider } from './Context/FormDataContext';
import { UserDataProvider } from './Context/UserDataContext';
import { AmadeusDataProvider } from './Context/AmadeusContext';
createRoot(document.getElementById('root')).render(
<Fragment>
<BrowserRouter>
<FormDataProvider>
<UserDataProvider>
<AmadeusDataProvider>
<Provider store={store}><App/></Provider>
</AmadeusDataProvider>
</UserDataProvider>
</FormDataProvider>
</BrowserRouter>
 </Fragment>);

