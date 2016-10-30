export const INITIALIZE_VALUES = 'INITIALIZE_VALUES';
export const SET_CURRENT_BOOKS = 'SET_CURRENT_BOOKS';
export const CHANGE_FIELD = 'CHANGE_FIELD';
export const ADD_NEW_BOOK = 'ADD_NEW_BOOK';
export const SAVE_CHANGES = 'SAVE_CHANGES';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const DELETE_BOOK = 'DELETE_BOOK';

export function initializeValues(books) {
    return {
        type: INITIALIZE_VALUES,
        books
    };
}

export function setCurrentBook(id) {
    return {
        type: SET_CURRENT_BOOKS,
        id
    };
}

export function changeField(field, value) {
    return {
        type: CHANGE_FIELD,
        field,
        value
    };
}

export function validationErrors(field, error) {
    return {
        type: VALIDATION_ERROR,
        field,
        error
    };
}

export function saveChanges(id) {
    return {
        type: SAVE_CHANGES,
        id
    };
}

export function deleteBook(id) {
    return {
        type: DELETE_BOOK,
        id
    };
}

export function addNewBook() {
    return {
        type: ADD_NEW_BOOK
    };
}
