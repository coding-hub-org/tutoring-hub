import React from 'react';
import './Stats.css';

// Import components

const Stats = () => {
    return(
        <div className={'stats-component'}>
            <h2>Stats</h2>
            <div className={'stats-component--feature'}>
                <p>Methodology: </p>
                <div className={'stats-component--feature__wrapper'}>
                    <div className={'stats-component--feature__progress'}>
                    </div>
                </div>
            </div>
            <div className={'stats-component--feature'}>
                <p>Organization: </p>
                <div className={'stats-component--feature__wrapper'}>
                    <div className={'stats-component--feature__progress'}>
                    </div>
                </div>
            </div>
            <div className={'stats-component--feature'}>
                <p>Preparation: </p>
                <div className={'stats-component--feature__wrapper'}>
                    <div className={'stats-component--feature__progress'}>
                    </div>
                </div>
            </div>
            <div className={'stats-component--feature'}>
                <p>Knowlege: </p>
                <div className={'stats-component--feature__wrapper'}>
                    <div className={'stats-component--feature__progress'}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;