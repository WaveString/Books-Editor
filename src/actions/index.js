import * as API from '../services/api';

export const INITIALIZE_VALUES = 'INITIALIZE_VALUES';
export const SET_CURRENT_BOOK = 'SET_CURRENT_BOOK';
export const CHANGE_FIELD = 'CHANGE_FIELD';
export const ADD_NEW_BOOK = 'ADD_NEW_BOOK';
export const SAVE_CHANGES = 'SAVE_CHANGES';
export const DELETE_BOOK = 'DELETE_BOOK';
export const ADD_NEW_AUTHOR = 'ADD_NEW_AUTHOR';
export const DELETE_AUTHOR = 'DELETE_AUTHOR';
export const CHANGE_ARRAY_FIELD = 'CHANGE_ARRAY_FIELD';
export const ADD_SORT_FIELD = 'ADD_SORT_FIELD';
export const DELETE_SORT_FIELD = 'DELETE_SORT_FIELD';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'UPLOAD_IMAGE_ERROR';

export function initializeValues(books, sort) {
    return {
        type: INITIALIZE_VALUES,
        books,
        sort
    };
}

export function setCurrentBook(id) {
    return {
        type: SET_CURRENT_BOOK,
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

export function addSortField(field) {
    return {
        type: ADD_SORT_FIELD,
        field
    };
}

export function deleteSortField(field) {
    return {
        type: DELETE_SORT_FIELD,
        field
    };
}

export function uploadImage(id, file) {
    return (dispatch) => {
        const data = new FormData();
        data.append('image', file);

        return API.uploadImage(data)
            .then(res => res.json())
            .then(body => {
                const { imageUrl } = body;
                dispatch(uploadImageSuccess(id, imageUrl));
            })
            .catch(() => dispatch(uploadImageError()));
    };
}

function uploadImageSuccess(id, imageUrl) {
    return {
        type: UPLOAD_IMAGE_SUCCESS,
        id,
        imageUrl
    };
}

function uploadImageError() {
    return {
        type: UPLOAD_IMAGE_ERROR
    };
}
