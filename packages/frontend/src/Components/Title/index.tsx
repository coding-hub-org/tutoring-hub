import React from 'react';
import './style.scss';

interface Props {
    title: string;
}

export default function Title(props: Props) {
    return (
        <h1 className={"title-component"}>
            {props.title}
        </h1>
    );
}