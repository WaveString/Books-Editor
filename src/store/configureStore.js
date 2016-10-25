import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../components/DevTools';

const configureStore = initialState => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(createLogger()),
            DevTools.instrument()
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;