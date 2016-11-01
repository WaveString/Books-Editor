export const INITIALIZE_VALUES = 'INITIALIZE_VALUES';
export const SET_CURRENT_BOOKS = 'SET_CURRENT_BOOKS';
export const CHANGE_FIELD = 'CHANGE_FIELD';
export const ADD_NEW_BOOK = 'ADD_NEW_BOOK';
export const SAVE_CHANGES = 'SAVE_CHANGES';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const DELETE_BOOK = 'DELETE_BOOK';
export const ADD_NEW_AUTHOR = 'ADD_NEW_AUTHOR';
export const DELETE_AUTHOR = 'DELETE_AUTHOR';
export const CHANGE_ARRAY_FIELD = 'CHANGE_ARRAY_FIELD';

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

export function changeArrayField(id, arrayField, index, field, value) {
    return {
        type: CHANGE_ARRAY_FIELD,
        id,
        arrayField,
        index,
        field,
        value
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

export function addNewAuthor(id) {
    return {
        type: ADD_NEW_AUTHOR,
        id
    };
}

export function deleteAuthor(id) {
    return {
        type: DELETE_AUTHOR,
        id
    };
}
