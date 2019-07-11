import React from 'react';
import './style.scss';

export default function AddTutorBox() {
    return (
        <div className={"add-tutor-box-component"}>
            <p>Missing someone?</p>
            <a href="/tutors/add">
                <div className="add-tutor-box-button">
                    <p>Add Tutor</p>
                </div>
            </a>
        </div >
    )
}