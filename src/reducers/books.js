import {
    INITIALIZE_VALUES,
    SET_CURRENT_BOOKS,
    CHANGE_FIELD,
    ADD_NEW_BOOK,
    SAVE_CHANGES,
    DELETE_BOOK,
    ADD_NEW_AUTHOR,
    DELETE_AUTHOR,
    CHANGE_ARRAY_FIELD
} from '../actions';

import { validate, formIsValid } from '../utils/validation';

const initialState = {
    isLoaded: false,
    list: [],
    form: {
        changes: {},
        errors: {},
        valid: false
    },
    currentBookId: 0
};

const emptyBook = {
    title: '',
    authors: [],
    pages: '',
    publisherName: '',
    published: '',
    release: '',
    ISBN: ''
};

const emptyAuthor = {
    firstName: '',
    lastName: ''
};

export function booksReducer(state = initialState, action) {
    let currentBook;

    switch (action.type) {
        case INITIALIZE_VALUES:
            return {
                ...state,
                list: [ ...action.books ],
                currentBookId: action.books[0] && action.books[0].id || 0
            };
        case SET_CURRENT_BOOKS:
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
        default:
            return state;
    }
}

export function formReducer(state = initialState.form, action) {
    let changes;
    let authors;

    switch (action.type) {
        case SAVE_CHANGES:
            return {
                ...state,
                changes: {}
            };
        case ADD_NEW_BOOK:
            return {
                ...state,
                changes: {
                    ...action.newBook
                },
                valid: false
            };
        case CHANGE_FIELD:
            changes = { ...state.changes, [action.field]: action.value };
            return {
                ...state,
                changes,
                errors: { ...state.errors, [action.field]: validate(action.field, action.value) },
                valid: formIsValid(changes)
            };
        case CHANGE_ARRAY_FIELD:
            const arr = state.changes[action.arrayField] || action.currentBook[action.arrayField];
            const newArr = arr.map((item, i) => i === action.index ? { ...item, [action.field]: action.value } : item);
            changes = { ...state.changes, [action.arrayField]: newArr };

            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.arrayField]: validate(action.arrayField, changes[action.arrayField])
                },
                changes,
                valid: formIsValid(changes)
            };
        case SET_CURRENT_BOOKS:
            return {
                ...state,
                changes: {}
            };
        case ADD_NEW_AUTHOR:
            const authorsList = state.changes.authors || action.authors;
            return {
                ...state,
                changes: {
                    ...state.changes,
                    authors: [ ...authorsList, emptyAuthor]
                },
                valid: false
            };
        case DELETE_AUTHOR:
            authors = state.changes.authors || action.currentBook.authors;
            const lastId = authors.length - 1;
            const deletedAuthor = authors.filter((author, i) => i !== lastId);
            changes = { ...state.changes, authors: [ ...deletedAuthor ] };

            return {
                ...state,
                changes,
                valid: formIsValid(changes)
            };
        default:
            return state;
    }
}
