import { combineReducers } from 'redux';
import { booksReducer as books } from './books';

const rootReducer = combineReducers({
    books
});

export default rootReducer;