import React from 'react';
import ActionInfo from 'material-ui/svg-icons/action/done';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { authorsToString } from '../../utils';

const BookList = ({ books = [], currentBookId = 0, onBookClick }) => {
    if (books.length) {
        return (
            <Paper zDepth={2}>
                <List>
                    { books.map((item, i) =>
                        <ListItem
                            key={i}
                            onClick={() => onBookClick(item.id)}
                            primaryText={item.title || 'Новая книга'}
                            secondaryText={authorsToString(item.authors)}
                            rightIcon={item.id === currentBookId ? <ActionInfo /> : null}
                        />
                    )}
                </List>
            </Paper>
        );
    }

    return null;
};

export default BookList;
