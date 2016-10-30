export const validate = (field, value) => {
    if (field === 'title') {
        return titleRule(value);
    }

    if (field === 'pages') {
        return pagesRule(value);
    }

    if (field === 'publisherName') {
        return publisherNameRule(value);
    }

    if (field === 'published') {
        return publishedRule(value);
    }
};

function titleRule(value) {
    if (!value) {
        return 'Обязательный параметр';
    }

    if (value.length > 30) {
        return 'Не более 30 символов';
    }
}

function pagesRule(value) {
    value = Number(value);

    if (!value) {
        return 'Обязательный параметр';
    }

    if (value > 10000) {
        return 'Не более 10000';
    }
}

function publisherNameRule(value) {
    if (value.length > 30) {
        return 'Не более 30 символов';
    }
}

function publishedRule(value) {
    value = Number(value);

    if (!value) {
        return;
    }

    if (value < 1800) {
        return 'Не раньше 1800';
    }
}

export const formIsVaild = (changes) => {
    let valid = true;

    for (let field in changes) {
        const error = validate(field, changes[field]);

        if (error) {
            valid = false;
        }
    }

    return valid;
};
