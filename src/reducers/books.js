import {
    INITIALIZE_VALUES,
    SET_CURRENT_BOOK,
    CHANGE_FIELD,
    ADD_NEW_BOOK,
    SAVE_CHANGES,
    DELETE_BOOK,
    ADD_NEW_AUTHOR,
    DELETE_AUTHOR,
    CHANGE_ARRAY_FIELD,
    ADD_SORT_FIELD,
    DELETE_SORT_FIELD,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR
} from '../actions';

import { formReducer } from './form';

export const initialState = {
    list: [],
    form: {
        changes: {},
        errors: {},
        valid: false
    },
    currentBookId: 0,
    sort: {
        title: false,
        published: false
    }
};

const emptyBook = {
    image: '',
    title: '',
    authors: [],
    pages: '',
    publisherName: '',
    published: '',
    release: '',
    ISBN: ''
};

export function booksReducer(state = initialState, action) {
    let currentBook;
    let list;
    let sort;

    switch (action.type) {
        case INITIALIZE_VALUES:
            return {
                ...state,
                list: [ ...action.books ],
                currentBookId: action.books[0] && action.books[0].id || 0,
                sort: action.sort || state.sort
            };
        case SET_CURRENT_BOOK:
            return {
                ...state,
                currentBookId: action.id,
                form: formReducer(state.form, action)
            };
        case CHANGE_FIELD:
            return {
                ...state,
                form: formReducer(state.form, action)
            };
        case CHANGE_ARRAY_FIELD:
            currentBook = state.list.find((book) => book.id === action.id);

            return {
                ...state,
                form: formReducer(state.form, { ...action, currentBook })
            };
        case ADD_NEW_BOOK:
            const lastElement = state.list[state.list.length - 1] || {};
            const newId = lastElement.id ? Number(lastElement.id) + 1 : 1;
            const newBook = { ...emptyBook, id: newId };

            return {
                ...state,
                currentBookId: newBook.id,
                form: formReducer(state.form, { ...action, newBook })
            };
        case SAVE_CHANGES:
            const inArray = state.list.some(book => book.id === action.id);

            if (!inArray) {
                const updateList = [ ...state.list, state.form.changes ];
                localStorage.setItem('books', JSON.stringify(updateList));

                return {
                    ...state,
                    list: updateList,
                    currentBookId: state.form.changes.id,
                    form: formReducer(state.form, action)
                };
            }
            const newList = [ ...state.list.map(book =>
                book.id === action.id ? ({ ...book, ...state.form.changes }) : book) ];
            localStorage.setItem('books', JSON.stringify(newList));

            return {
                ...state,
                list: newList,
                form: formReducer(state.form, action)
            };
        case DELETE_BOOK:
            const deletedList = state.list.filter(book => book.id !== action.id);
            localStorage.setItem('books', JSON.stringify(deletedList));

            return {
                ...state,
                list: [ ...deletedList ],
                currentBookId: deletedList[0] && deletedList[0].id || 0,
                form: initialState.form
            };
        case ADD_NEW_AUTHOR:
            currentBook = state.list.find(book => book.id === action.id) || emptyBook;
            return {
                ...state,
                form: formReducer(state.form, { ...action, authors: currentBook.authors })
            };
        case DELETE_AUTHOR:
            currentBook = state.list.find((book) => book.id === action.id);
            return {
                ...state,
                form: formReducer(state.form, { ...action, currentBook })
            };
        case ADD_SORT_FIELD:
            sort = { ...state.sort, [action.field]: true };
            localStorage.setItem('sort', JSON.stringify(sort));

            return {
                ...state,
                sort
            };
        case DELETE_SORT_FIELD:
            sort = { ...state.sort, [action.field]: false };
            localStorage.setItem('sort', JSON.stringify(sort));

            return {
                ...state,
                sort
            };
        case UPLOAD_IMAGE_SUCCESS:
            const isExist = state.list.some(book => book.id === action.id);

            if (isExist) {
                list = [ ...state.list.map(book =>
                    book.id === action.id ? ({ ...book, image: action.imageUrl }) : book) ];
                localStorage.setItem('books', JSON.stringify(list));
                return {
                    ...state,
                    list,
                    form: formReducer(state.form, action)
                };
            }

            return {
                ...state,
                form: formReducer(state.form, action)
            };
        case UPLOAD_IMAGE_ERROR:
            return {
                ...state,
                form: formReducer(state.form, action)
            };
        default:
            return state;
    }
}
