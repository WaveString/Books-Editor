import React, { Component } from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import styles from './index.css';

export default class ImageField extends Component {
    constructor() {
        super();

        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleImageChange() {
        const { id, onChooseImage } = this.props;
        const imageNode = this.refs.file;
        const files = imageNode.files;

        onChooseImage(id, files[0]);
    }

    handleButtonClick() {
        const imageNode = this.refs.file;
        imageNode.click();
    }

    render() {
        let { image, error, title } = this.props;
        let element;

        if (image) {
            element = (
                <GridTile
                    key={image}
                    title={title}
                    actionIcon={<IconButton onClick={this.handleButtonClick}><ModeEdit color="white"/></IconButton>}>
                    <img className={ styles.image } src={image} />
                </GridTile>);
        } else {
            element = (
                <RaisedButton onClick={this.handleButtonClick} fullWidth={true} label="Загрузить обложку"/>
            );
        }

        return (
            <div className={ styles.button }>
                <input ref="file" type="file"
                       accept='image/jpeg,image/gif,image/png,image/x-png'
                       className={ styles.input }
                       onChange={ this.handleImageChange }
                />
                { element }
                { error && <span className={ styles.error }>{ error }</span>}
            </div>
        );
    }
}
