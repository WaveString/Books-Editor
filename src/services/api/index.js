export function uploadImage(data) {
    return fetch('/api/images', {
        method: 'POST',
        body: data
    });
}
