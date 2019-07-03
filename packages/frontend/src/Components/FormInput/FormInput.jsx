import React from 'react';
import './FormInput.css';

const FormInput = (props) => {

    return (
        <input
            id={props.name}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder}
            required={props.required}
        />
    );
}

export default FormInput;