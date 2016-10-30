import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';

import './index.css';
import configureStore from './store/configureStore';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();

const rootEl = document.getElementById('root');

ReactDom.render(
    <AppContainer>
        <Root store={ store }/>
    </AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NextRoot = require('./containers/Root').default;
        ReactDom.render(
            <AppContainer>
                <NextRoot store={ store }/>
            </AppContainer>,
            rootEl
        );
    });
}