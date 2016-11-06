export function clean(obj) {
    Object.keys(obj).forEach((key) =>
    (obj[key] === undefined || obj[key] === null || obj[key].length === 0) && delete obj[key]);
    return obj;
}

export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export function formatDate(date) {
    if (!date) {
        return '';
    }

    if (typeof date === 'string') {
        date = new Date(date);
    }

    if (date instanceof Date) {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    return date;
}

export const authorsToString = (authors = []) =>
    authors.reduce((sum, current) => `${sum ? sum + ', ' : sum} ${current.firstName} ${current.lastName}`, '');

export function sortBooks(books = [], sort = {}) {
    const sortBooks = [ ...books ];

    sortBooks.sort((a, b) => {
        for (let field in sort) {
            if (sort[field]) {
                if (((b[field] < a[field]) - (a[field] < b[field]))) {
                    return a[field] > b[field];
                }
            }
        }
    });

    return sortBooks;
}
