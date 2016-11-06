import { clean, isEmptyObject, formatDate } from './index';

export const validate = (field, value) => {
    if (field === 'title') {
        return titleRule(value);
    }

    if (field === 'authors') {
        return authorsRule(value);
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

    if (field === 'release') {
        return releaseRule(value);
    }

    if (field === 'ISBN') {
        return ISBNRule(value);
    }
};

function titleRule(value) {
    const count = 30;

    if (!value) {
        return 'Обязательное поле';
    }

    if (value.length > count) {
        return `Не более ${count} символов`;
    }
}

function pagesRule(value) {
    const count = 10000;

    value = Number(value);

    if (isNaN(value)) {
        return 'Только цифры';
    }

    if (!value) {
        return 'Обязательное поле';
    }

    if (value > count) {
        return `Не более ${count}`;
    }
}

function authorsRule(value) {
    if (value.length === 0) {
        return 'Обязательное поле';
    }

    let errors = [];

    value.forEach(item => {
        const count = 20;
        let error = {};

        if (!item.firstName) {
            error.firstName = 'Обязательное поле';
        }

        if (item.firstName.length > 20) {
            error.firstName = `Не более ${count} символов`;
        }

        if (!item.lastName) {
            error.lastName = 'Обязательное поле';
        }

        if (item.firstName.length > 20) {
            error.lastName = `Не более ${count} символов`;
        }

        errors.push(error);
    });

    return errors;
}

function publisherNameRule(value) {
    const count = 30;

    if (value.length > count) {
        return `Не более ${count} символов`;
    }
}

function publishedRule(value) {
    const count = 1800;

    value = Number(value);

    if (!value) {
        return;
    }

    if (isNaN(value)) {
        return 'Только цифры';
    }

    if (value < count) {
        return `Не раньше ${count}`;
    }
}

function releaseRule(value) {
    const validationDate = new Date(1800, 0, 1);
    const currentDate = new Date(value);
    const timeDiff = currentDate.getTime() - validationDate.getTime();

    if (timeDiff < 0) {
        return `Не раньше ${formatDate(validationDate)}`;
    }
}

function ISBNRule(value) {
    const regexp = new RegExp(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/);

    if (!value) {
        return;
    }

    if (!value.match(regexp)) {
        return 'Неверный формат';
    }
}

export function formIsValid (changes) {
    let valid = true;

    for (let field in changes) {
        const error = validate(field, changes[field]);

        if (Array.isArray(error)) {
            valid = error.every(element => isEmptyObject(clean(element)));
        } else if (error) {
            valid = false;
        }
    }

    return valid;
}