import React from 'react';
import './AddTutor.css';

const AddTutor = () => {
    
    const handleClick = (e) => {
        
        console.log("Handle add tutor event here...");        

    }

    return (
        <div className={"add-tutor-component"}>
            <button onClick={handleClick}>Add Tutor</button>
        </div>
    )
}

export default AddTutor;