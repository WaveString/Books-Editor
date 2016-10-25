// import { FIRM_FETCH_SUCCESS, ADV_MODEL_FETCH_SUCCESS, FETCH_REGION_SUCCESS } from '../actions/am';

const initialState = {
    isLoaded: false,
    books: []
};

export function books(state = initialState, action) {
    switch (action.type) {
        case 'BOOKS_LOAD_SUCCESS':
            return {
                books: action.books,
                isLoaded: true
            };
        case 'ADD_NEW_BOOK':
            return {
                ...state,
                books: [...state.books, action.book]
            };
        default:
            return state;
    }
}
