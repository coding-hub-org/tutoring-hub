import React from 'react';
import './FormDate.css';

const FormDate = (props) => {

    return (
        <input
            id={props.name}
            name={props.name}
            type="date"
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder}
        />
    );
}

export default FormDate;