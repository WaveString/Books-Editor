export function getBooksList(state) {
    return state.books.list || [];
}

export function getCurrentBookId(state) {
    return state.books.currentBookId || null;
}

export function getBookChanges(state) {
    return state.books.form.changes || {};
}

export function findCurrentBook(state) {
    return getBooksList(state).find(book => book.id === getCurrentBookId(state)) || getBookChanges(state);
}
