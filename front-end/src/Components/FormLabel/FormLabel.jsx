import React from 'react';
import './FormLabel.css';

const FormLabel = (props) => {
    return (
        <label htmlFor={props.name}>{props.labelText}</label>
    )
}

export default FormLabel;