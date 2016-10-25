import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from '../../components/DevTools';
import App from '../App';

const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';

const Root = ({ store }) => (
    <Provider store={ store }>
        <div>
            <App />
            { __DEVELOPMENT__ && <DevTools /> }
        </div>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
