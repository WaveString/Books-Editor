import React from 'react';
import ActionInfo from 'material-ui/svg-icons/action/done';
import { List, ListItem } from 'material-ui/List';
import { authorsToString } from '../../helpers';

const BookList = ({ books, currentBookId, onBookClick }) => {
    if (books.length) {
        return (<List>
            { books.map((item, i) =>
                <ListItem
                    key={i}
                    onClick={() => onBookClick(item.id)}
                    primaryText={item.title || 'Новая книга'}
                    secondaryText={authorsToString(item.authors)}
                    rightIcon={item.id === currentBookId ? <ActionInfo /> : null}
                />
            )}
        </List>);
    }

    return null;
};

export default BookList;
