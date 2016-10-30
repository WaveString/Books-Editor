import {
    INITIALIZE_VALUES,
    SET_CURRENT_BOOKS,
    CHANGE_FIELD,
    ADD_NEW_BOOK,
    SAVE_CHANGES,
    VALIDATION_ERROR,
    DELETE_BOOK
} from '../actions';

import { formIsVaild } from '../utils/validation';

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

export function books(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_VALUES:
            return {
                ...state,
                list: [ ...action.books ],
                currentBookId: action.books[0].id
            };
        case SET_CURRENT_BOOKS:
            return {
                ...state,
                currentBookId: action.id,
                form: {
                    ...state.form,
                    changes: {}
                }
            };
        case VALIDATION_ERROR:
            return {
                ...state,
                form: {
                    ...state.form,
                    errors: { ...state.form.errors, [action.field]: action.error },
                    valid: false
                }
            };
        case CHANGE_FIELD:
            const changes = { ...state.form.changes, [action.field]: action.value };
            return {
                ...state,
                form: {
                    ...state.form,
                    changes,
                    valid: formIsVaild(changes)
                }
            };
        case ADD_NEW_BOOK:
            const lastElement = state.list[state.list.length - 1] || {};
            const newId = lastElement.id ? Number(lastElement.id) + 1 : 1;
            const newBook = { ...emptyBook, id: newId };

            return {
                ...state,
                currentBookId: newBook.id,
                form: {
                    ...state.form,
                    changes: {
                        ...newBook
                    },
                    valid: false
                }
            };
        case SAVE_CHANGES:
            const inArray = state.list.some(book => Number(book.id) === Number(action.id));

            if (!inArray) {
                const updateList = [ ...state.list, state.form.changes ];
                localStorage.setItem('books', JSON.stringify(updateList));

                return {
                    ...state,
                    list: updateList,
                    form: {
                        ...state.form,
                        changes: {}
                    },
                    currentBookId: state.form.changes.id
                };
            }

            const newList = [ ...state.list.map(book =>
                Number(book.id) === Number(action.id) ? ({ ...book, ...state.form.changes }) : book) ];
            localStorage.setItem('books', JSON.stringify(newList));

            return {
                ...state,
                list: newList,
                form: {
                    ...state.form,
                    changes: {}
                }
            };
        case DELETE_BOOK:
            const deletedList = state.list.filter(book => Number(book.id) !== Number(action.id));
            localStorage.setItem('books', JSON.stringify(deletedList));

            return {
                ...state,
                list: [...deletedList],
                currentBookId: deletedList[0] && deletedList[0].id || 0,
                form: {
                    changes: {},
                    errors: {},
                    valid: false
                }
            };
        default:
            return state;
    }
}