import React, { Fragment } from 'react';

import GlobalStyle from './styles/global';
import Router from './routes';

const App = () => (
    <Fragment>
        <GlobalStyle />
        <Router />
    </Fragment>
)

export default App;
