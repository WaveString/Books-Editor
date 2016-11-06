import React, { Component } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BookForm from '../../components/BookForm';
import BookList from '../../components/BookList';
import AddButton from '../../components/AddButton';
import Sorting from '../../components/Sorting';

import { findCurrentBook } from '../../store/helpers';
import { sortBooks } from '../../utils';
import {
    setCurrentBook,
    changeField,
    saveChanges,
    deleteBook,
    addNewBook,
    initializeValues,
    addNewAuthor,
    deleteAuthor,
    changeArrayField,
    addSortField,
    deleteSortField,
    uploadImage
} from '../../actions';
import styles from './index.css';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const books = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : process.env.BOOKS;
        const sort = localStorage.getItem('sort') ? JSON.parse(localStorage.getItem('sort')) : null;
        this.props.initializeValues(books, sort);
    }

    render() {
        const {
            books,
            sort,
            currentBook,
            changes,
            errors,
            valid,
            onBookClick,
            onFieldEdit,
            onArrayFieldEdit,
            onSaveChanges,
            onAddNewBook,
            onDelete,
            onAddNewAuthor,
            onDeleteAuthor,
            onAddSortField,
            onDeleteSortField,
            onChooseImage
        } = this.props;

        return (
            <MuiThemeProvider>
                <div>
                    <div className={ styles.controls }>
                        <AddButton onAddNewBook={ onAddNewBook } />
                        <Sorting
                            sort={sort}
                            onAddSortField={onAddSortField}
                            onDeleteSortField={onDeleteSortField}
                        />
                    </div>
                    <div className={ styles.list }>
                        <BookList
                            books={ books }
                            currentBookId={ currentBook.id }
                            onBookClick={ onBookClick }
                        />
                    </div>
                    <div className={ styles.form }>
                        <BookForm
                            book={ currentBook }
                            changes={ changes }
                            errors={ errors }
                            valid={ valid }
                            onFieldEdit={ onFieldEdit }
                            onArrayFieldEdit={ onArrayFieldEdit }
                            onSaveChanges={ onSaveChanges }
                            onDelete={ onDelete }
                            onAddNewAuthor={ onAddNewAuthor }
                            onDeleteAuthor={ onDeleteAuthor }
                            onChooseImage={ onChooseImage }
                            />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const select = (state) => {
    return {
        books: sortBooks(state.books.list, state.books.sort),
        currentBook: findCurrentBook(state),
        changes: state.books.form.changes,
        errors: state.books.form.errors,
        valid: state.books.form.valid,
        sort: state.books.sort
    };
};

const mapDispatchToProps = (dispatch) => ({
    initializeValues: (books, sort) => dispatch(initializeValues(books, sort)),
    onBookClick: (id) => dispatch(setCurrentBook(id)),
    onFieldEdit: (...args) => dispatch(changeField(...args)),
    onArrayFieldEdit: (...args) => dispatch(changeArrayField(...args)),
    onSaveChanges: (id) => dispatch(saveChanges(id)),
    onAddNewBook: () => dispatch(addNewBook()),
    onDelete: (id) => dispatch(deleteBook(id)),
    onAddNewAuthor: (id) => dispatch(addNewAuthor(id)),
    onDeleteAuthor: (id) => dispatch(deleteAuthor(id)),
    onAddSortField: (field) => dispatch(addSortField(field)),
    onDeleteSortField: (field) => dispatch(deleteSortField(field)),
    onChooseImage: (id, file) => dispatch(uploadImage(id, file))
});

export default connect(select, mapDispatchToProps)(App);
