import React from 'react';
import './FormInput.css';

const FormInput = (props) => {

    const handleChange = (e) => {
        this.setState({ value: e.target.value.toUpperCase() });
    }

    return (
        <input
            id={props.name}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder}
        />
    );
}

export default FormInput;