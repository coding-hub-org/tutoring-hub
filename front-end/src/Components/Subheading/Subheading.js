import React from 'react';
import './Subheading.css';

const Subheading = ({title}) => {
    return (
        <h1 className={'subheading-component'}>
            {title}
        </h1>
    );
}

export default Subheading;