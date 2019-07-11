import React, { Component } from 'react'
import './style.scss';

import TutorCardPartial from '../TutorCardPartial';

interface Props {
    tutors: any[];
}

export default class TutorCards extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const tutors = this.props.tutors.map((tutor) =>
            <TutorCardPartial tutor={tutor} key={tutor._id} />
        );

        return (
            <div className={"Tutor-Cards-Component"}>
                {tutors}
            </div>
        );
    }
}