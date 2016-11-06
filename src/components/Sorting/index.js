import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import styles from './index.css';

export default class Sorting extends Component {
    constructor() {
        super();
    }

    render() {
        const { sort, onAddSortField, onDeleteSortField } = this.props;
        return (
            <div className={ styles.wrapper }>
                <Toggle
                    label='Сортировать по заголовку'
                    toggled={ sort.title }
                    onToggle={ sort.title ?
                        () => onDeleteSortField('title') :
                        () => onAddSortField('title') }/>
                <Toggle
                    label='Сортировать по году публикации'
                    toggled={ sort.published }
                    onToggle={ sort.published ?
                        () => onDeleteSortField('published') :
                        () => onAddSortField('published') }/>
            </div>
        );
    }
}