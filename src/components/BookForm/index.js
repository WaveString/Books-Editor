import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import AuthorsField from './AuthorsField';
import ImageField from './ImageField';

import { isEmptyObject, formatDate } from '../../utils';
import styles from './index.css';

export default class BookForm extends Component {
    constructor() {
        super();

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
    }

    handleOnChange(e) {
        const value = e.target.value;
        const field = e.target.getAttribute('id');

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

    handleOnChangeDate(field, empty, date) {
        this.props.onFieldEdit(field, date);
    }

    openDatePicker(e) {
        e.stopPropagation();
        e.preventDefault();

        this.datepicker.focus();
    }

    render() {
        const {
            book,
            changes,
            errors,
            valid,
            onAddNewAuthor,
            onDeleteAuthor,
            onArrayFieldEdit,
            onChooseImage
        } = this.props;

        if (isEmptyObject(book)) {
            return null;
        }

        return (
            <Paper zDepth={2} className={ styles.paper }>
                <ImageField
                    id={book.id}
                    image={book.image}
                    error={errors.image}
                    title={ changes.hasOwnProperty('title') ? changes.title : book.title }
                    onChooseImage={onChooseImage} />
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
                <AuthorsField
                    bookId={book.id}
                    authors={book.authors}
                    changes={changes.authors}
                    errors={errors.authors}
                    onAddNewAuthor={onAddNewAuthor}
                    onDeleteAuthor={onDeleteAuthor}
                    onArrayFieldEdit={onArrayFieldEdit}
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
                <DatePicker
                    hintText="Дата выхода в тираж"
                    onChange={this.handleOnChangeDate.bind(this, 'release')}
                    ref={(datepicker) => this.datepicker = datepicker}
                    textFieldStyle={{ display: 'none' }}
                    minDate={ new Date(1750, 0, 1) }
                />
                <TextField
                    floatingLabelText="Дата выхода в тираж"
                    hintText="Введите дату выхода в тираж"
                    value={ changes.hasOwnProperty('release') ? formatDate(changes.release) : formatDate(book.release) }
                    id="release"
                    errorText={errors.release}
                    onSelect={this.openDatePicker}
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
                        disabled={ !valid } />
                    <RaisedButton
                        className={styles.button}
                        onClick={this.handleOnDelete}
                        label="Удалить"
                        secondary={ true }
                        />
                </div>
            </Paper>
        );
    }
}