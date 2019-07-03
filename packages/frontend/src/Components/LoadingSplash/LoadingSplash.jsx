import React from 'react';
import './LoadingSplash.css';

import loadingIcon from '../../Assets/loading-icon.png';

class LoadingSplash extends React.Component {

    render() {
        return (
            <div className={"loading-component"}>
                <div className={"loading"}>
                    <img src={loadingIcon} alt="" />
                </div>
            </div>
        );
    }
}

export default LoadingSplash;