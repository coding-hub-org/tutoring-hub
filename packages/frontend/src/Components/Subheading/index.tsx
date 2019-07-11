import React from 'react';
import './style.scss';

interface Props {
    title: string;
}

export default function Subheading(props: Props) {
    return (
        <h1 className={'subheading-component'}>
            {props.title}
        </h1>
    );
}