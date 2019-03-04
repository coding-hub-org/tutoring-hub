import React from 'react';
import './AddTutorBox.css';

const AddTutorBox = () => {

    return (
        <div className={"add-tutor-box-component"}>
            <p>Missing someone?</p>
            <div className="add-tutor-box-button">
                <a href="/addtutor">Add Tutor</a>
            </div>
        </div>
    )
}

export default AddTutorBox;