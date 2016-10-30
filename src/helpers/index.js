export const authorsToString = (authors = []) =>
    authors.reduce((sum, current) => `${sum ? sum + ', ' : sum} ${current.firstName} ${current.lastName}`, '');
