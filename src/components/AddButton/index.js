import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './index.css';

const AddButton = ({ onAddNewBook }) => (
    <div className={ styles.button }>
        <FloatingActionButton mini={true} onClick={ onAddNewBook }>
            <ContentAdd />
        </FloatingActionButton>
    </div>
);

export default AddButton;
