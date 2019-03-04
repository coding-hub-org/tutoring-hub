import React from 'react';
import './FormButton.css';

const FormButton = (props) => {
    return (
        <button
            style={props.style}
            onClick={props.action}>
            {props.title}
        </button>
    );
}

export default FormButton;