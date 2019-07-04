import React from "react";
import "./Stats.css";

// Import components

const Stats = ({ reviews }) => {
    let stats = {
        methodology: 0,
        organization: 0,
        preparation: 0,
        clarity: 0,
        knowledge: 0
    };

    const getStats = () => {
        reviews.forEach(review => {
            stats.methodology += review.statistics.methodology;
            stats.organization += review.statistics.organization;
            stats.preparation += review.statistics.preparation;
            stats.clarity += review.statistics.clarity;
            stats.knowledge += review.statistics.knowledge;
        });

        for (let key in stats) {
            stats[key] = ((stats[key] / reviews.length).toFixed(2) * 100) / 10;
        }
    };

    getStats();

    let methodologyBar = {
        width: `${stats.methodology}%`
    };

    let organizationBar = {
        width: `${stats.organization}%`
    };

    let preparationBar = {
        width: `${stats.preparation}%`
    };

    let clarityBar = {
        width: `${stats.clarity}%`
    };

    let knowledgeBar = {
        width: `${stats.knowledge}%`
    };

    return (
        <div className={"stats-component"}>
            <div className={"stats-component--feature"}>
                <p>Methodology: </p>
                <div className={"stats-component--feature__wrapper"}>
                    <div
                        style={methodologyBar}
                        className={"stats-component--feature__progress"}
                    />
                </div>
                <span>{(stats.methodology / 10).toFixed(1)}</span>
            </div>
            <div className={"stats-component--feature"}>
                <p>Organization: </p>
                <div className={"stats-component--feature__wrapper"}>
                    <div
                        style={organizationBar}
                        className={"stats-component--feature__progress"}
                    />
                </div>
                <span>{(stats.organization / 10).toFixed(1)}</span>
            </div>
            <div className={"stats-component--feature"}>
                <p>Preparation: </p>
                <div className={"stats-component--feature__wrapper"}>
                    <div
                        style={preparationBar}
                        className={"stats-component--feature__progress"}
                    />
                </div>
                <span>{(stats.preparation / 10).toFixed(1)}</span>
            </div>
            <div className={"stats-component--feature"}>
                <p>Clarity: </p>
                <div className={"stats-component--feature__wrapper"}>
                    <div
                        style={clarityBar}
                        className={"stats-component--feature__progress"}
                    />
                </div>
                <span>{(stats.clarity / 10).toFixed(1)}</span>
            </div>
            <div className={"stats-component--feature"}>
                <p>knowledge: </p>
                <div className={"stats-component--feature__wrapper"}>
                    <div
                        style={knowledgeBar}
                        className={"stats-component--feature__progress"}
                    />
                </div>
                <span>{(stats.knowledge / 10).toFixed(1)}</span>
            </div>
        </div>
    );
};

export default Stats;
