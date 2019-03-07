import React from 'react';
import './Stats.css';

// Import components

const Stats = ({reviews}) => {
    let stats = {
        "methodology": 0,
        "organization": 0,
        "preparation": 0,
        "clarity": 0,
        "knowlege": 0
    }

    const getStats = () => {
        reviews.forEach(review => {
            stats.methodology += review.statistics.methodology;
            stats.organization += review.statistics.organization;
            stats.preparation += review.statistics.preparation;
            stats.clarity += review.statistics.clarity;
            stats.knowlege += review.statistics.knowlege;
        });
        
        for (let key in stats) {
            stats[key] = (stats[key] / reviews.length).toFixed(2) * 100 / 10;
        }
    }

    getStats();

    let methodologyBar = {
        "width": `${stats.methodology}%`
    };

    let organizationBar = {
        "width": `${stats.organization}%`
    };

    let preparationBar = {
        "width": `${stats.preparation}%`
    };

    let clarityBar = {
        "width": `${stats.clarity}%`
    };

    let knowlegeBar = {
        "width": `${stats.knowlege}%`
    };


    return(
        <div className={'stats-component'}>
            <div className={'stats-component--feature'}>
                <p>Methodology: </p>
                <div className={'stats-component--feature__wrapper'}>
                    <div style={methodologyBar} className={'stats-component--feature__progress'}>
                    </div>
                </div>
            </div>
            <div className={'stats-component--feature'}>
                <p>Organization: </p>
                <div className={'stats-component--feature__wrapper'}>
                    <div style={organizationBar} className={'stats-component--feature__progress'}>
                    </div>
                </div>
            </div>
            <div className={'stats-component--feature'}>
                <p>Preparation: </p>
                <div className={'stats-component--feature__wrapper'}>
                    <div style={preparationBar} className={'stats-component--feature__progress'}>
                    </div>
                </div>
            </div>
            <div className={'stats-component--feature'}>
                <p>Clarity: </p>
                <div className={'stats-component--feature__wrapper'}>
                    <div style={clarityBar} className={'stats-component--feature__progress'}>
                    </div>
                </div>
            </div>
            <div className={'stats-component--feature'}>
                <p>Knowlege: </p>
                <div className={'stats-component--feature__wrapper'}>
                    <div style={knowlegeBar} className={'stats-component--feature__progress'}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;