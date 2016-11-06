import {
    SET_CURRENT_BOOK,
    CHANGE_FIELD,
    ADD_NEW_BOOK,
    SAVE_CHANGES,
    ADD_NEW_AUTHOR,
    DELETE_AUTHOR,
    CHANGE_ARRAY_FIELD,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR
} from '../actions';

import { validate, formIsValid } from '../utils/validation';

import { initialState } from './books';
const emptyAuthor = {
    firstName: '',
    lastName: ''
};

export function formReducer(state = initialState.form, action) {
    let changes;
    let authors;

    switch (action.type) {
        case SAVE_CHANGES:
            return {
                ...state,
                changes: {},
                valid: false
            };
        case ADD_NEW_BOOK:
            return {
                ...state,
                changes: {
                    ...action.newBook
                },
                errors: {},
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
        case SET_CURRENT_BOOK:
            return {
                ...state,
                changes: {},
                errors: {},
                valid: false
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
                errors: {
                    ...state.errors,
                    authors: validate('authors', deletedAuthor)
                },
                valid: formIsValid(changes)
            };
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                changes: { ...state.changes, image: [ action.imageUrl ] },
                errors: {
                    ...state.errors,
                    image: ''
                }
            };
        case UPLOAD_IMAGE_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    image: 'Что-то пошло не так'
                }
            };
        default:
            return state;
    }
}
