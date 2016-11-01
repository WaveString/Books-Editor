import React, { Component } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BookForm from '../../components/BookForm';
import BookList from '../../components/BookList';
import AddButton from '../../components/AddButton';

import { findCurrentBook } from '../../store/helpers';
import {
    setCurrentBook,
    changeField,
    saveChanges,
    deleteBook,
    addNewBook,
    initializeValues,
    addNewAuthor,
    deleteAuthor,
    changeArrayField
} from '../../actions';
import styles from './index.css';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const books = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : process.env.BOOKS;
        this.props.initializeValues(books);
    }

    render() {
        const {
            books,
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
            onDeleteAuthor
        } = this.props;

        return (
            <MuiThemeProvider>
                <div>
                    <div className={ styles.controls }>
                        <AddButton onAddNewBook={ onAddNewBook }/>
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
                            />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const select = (state) => {
    return {
        books: state.books.list,
        currentBook: findCurrentBook(state),
        changes: state.books.form.changes,
        errors: state.books.form.errors,
        valid: state.books.form.valid
    };
};

const mapDispatchToProps = (dispatch) => ({
    initializeValues: (books) => dispatch(initializeValues(books)),
    onBookClick: (id) => dispatch(setCurrentBook(id)),
    onFieldEdit: (...args) => dispatch(changeField(...args)),
    onArrayFieldEdit: (...args) => dispatch(changeArrayField(...args)),
    onSaveChanges: (id) => dispatch(saveChanges(id)),
    onAddNewBook: () => dispatch(addNewBook()),
    onDelete: (id) => dispatch(deleteBook(id)),
    onAddNewAuthor: (id) => dispatch(addNewAuthor(id)),
    onDeleteAuthor: (id) => dispatch(deleteAuthor(id))
});

export default connect(select, mapDispatchToProps)(App);
