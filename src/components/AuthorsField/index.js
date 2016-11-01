import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add-box';
import styles from './index.css';

export default class AuthorsField extends Component {
    constructor() {
        super();

        this.handleOnAddNewAuthor = this.handleOnAddNewAuthor.bind(this);
        this.handleOnDeleteAuthor = this.handleOnDelete.bind(this);
    }

    handleOnChange(i, e) {
        const value = e.target.value;
        const field = e.target.getAttribute('id');
        const { bookId } = this.props;

        this.props.onArrayFieldEdit(bookId, 'authors', i, field, value);
    }

    handleOnAddNewAuthor() {
        const { bookId, onAddNewAuthor } = this.props;
        onAddNewAuthor(bookId);
    }

    handleOnDelete() {
        const { bookId, onDeleteAuthor } = this.props;
        onDeleteAuthor(bookId);
    }

    render() {
        const { authors = [], changes = null, errors = [] } = this.props;
        const data = changes || authors;

        return (<div className={ styles.wrapper }>
            <div>Aвторы: *</div>
            { data.map((author, i) => {
                return (
                    <div className={ styles.author } key={i}>
                        <TextField
                            floatingLabelText="Имя"
                            hintText="Введите имя"
                            value={ author.firstName }
                            id="firstName"
                            errorText={ errors[i] && errors[i].firstName }
                            onChange={ this.handleOnChange.bind(this, i) }/>
                        <TextField
                            floatingLabelText="Фамилия"
                            hintText="Введите фамилию"
                            value={ author.lastName }
                            id="lastName"
                            errorText={ errors[i] && errors[i].lastName }
                            onChange={ this.handleOnChange.bind(this, i) }/>
                    </div>);
            })}
            <div className={ styles.button }>
                <FlatButton
                    primary={true}
                    icon={<ContentAdd />}
                    onClick={ this.handleOnAddNewAuthor } />
            </div>
            <div className={ styles.delete }>
                <FlatButton
                    secondary={true}
                    icon={<ActionDelete />}
                    onClick={ this.handleOnDeleteAuthor }/>
            </div>
        </div>);
    }
}