import React, { CSSProperties } from 'react';
import './style.scss';

interface Props {
    title?: string;
    style?: CSSProperties;
    action?: any;
}

export default function FormButton(props: Props) {
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