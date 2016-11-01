export function clean(obj) {
    Object.keys(obj).forEach((key) =>
    (obj[key] === undefined || obj[key] === null || obj[key].length === 0) && delete obj[key]);
    return obj;
}

export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

