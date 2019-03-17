import React from 'react';
import './FormButton.css';

const FormButton = (props) => {
    return (
        <div className={"Form-Button-Component"}>
            <button
                style={props.style}
                onClick={props.action}>
                {props.title}
            </button>
        </div>
    );
}

export default FormButton;