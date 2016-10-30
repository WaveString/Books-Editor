import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './index.css';
import { validate } from '../../utils/validation';
import { clean } from '../../utils';

export default class BookForm extends Component {
    constructor() {
        super();

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
    }

    handleOnChange(e) {
        const value = e.target.value;
        const field = e.target.getAttribute('id');
        const error = validate(field, value);

        this.props.onValidationErrors(field, error);
        this.props.onFieldEdit(field, value);
    }

    handleOnSave() {
        const id = this.props.book.id;
        this.props.onSaveChanges(id);
    }

    handleOnDelete() {
        const id = this.props.book.id;
        this.props.onDelete(id);
    }

    render() {
        const { book, changes, errors, valid } = this.props;

        if (Object.keys(book).length === 0) {
            return <div></div>;
        }

        return (
            <div>
                <TextField
                    floatingLabelText="Название книги *"
                    hintText="Введите название книги"
                    value={ changes.hasOwnProperty('title') ? changes.title : book.title }
                    id="title"
                    errorText={errors.title}
                    onChange={this.handleOnChange}
                />
                <TextField
                    floatingLabelText="Количество страниц  *"
                    hintText="Введите количество страниц"
                    value={ changes.hasOwnProperty('pages') ? changes.pages : book.pages }
                    id="pages"
                    errorText={errors.pages}
                    onChange={this.handleOnChange}
                />
                <TextField
                    floatingLabelText="Название издательства"
                    hintText="Введите название издательства"
                    value={ changes.hasOwnProperty('publisherName') ? changes.publisherName : book.publisherName }
                    id="publisherName"
                    errorText={errors.publisherName}
                    onChange={this.handleOnChange}
                />
                <TextField
                    floatingLabelText="Год публикации"
                    hintText="Введите год публикации"
                    value={ changes.hasOwnProperty('published') ? changes.published : book.published }
                    id="published"
                    errorText={errors.published}
                    onChange={this.handleOnChange}
                />
                <TextField
                    floatingLabelText="Дата выхода в тираж"
                    hintText="Введите дату выхода в тираж"
                    value={ changes.hasOwnProperty('release') ? changes.release : book.release }
                    id="release"
                    errorText={errors.release}
                    onChange={this.handleOnChange}
                />
                <TextField
                    floatingLabelText="ISBN"
                    hintText="Введите ISBN"
                    value={ changes.hasOwnProperty('ISBN') ? changes.ISBN : book.ISBN }
                    id="ISBN"
                    errorText={errors.ISBN}
                    onChange={this.handleOnChange}
                />
                <div className={styles.controls}>
                    <RaisedButton
                        className={styles.button}
                        onClick={this.handleOnSave}
                        label="Сохранить"
                        primary={ true }
                        disabled={
                            Object.keys(changes).length === 0 ||
                            Object.keys(clean(errors)).length !== 0 ||
                            !valid } />
                    <RaisedButton
                        className={styles.button}
                        onClick={this.handleOnDelete}
                        label="Удалить"
                        secondary={ true } />
                </div>
            </div>
        );
    }
}