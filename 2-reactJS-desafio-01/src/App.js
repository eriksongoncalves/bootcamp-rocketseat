import React, { Fragment } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';

import GlobalStyle from './style';

const App = () => (
    <Fragment>
        <GlobalStyle />
        <Header />
        <PostList />
    </Fragment>
)

export default App;
