import React, { Component } from 'react';
import './FormSlider.css';

const _ = require('underscore');


class FormSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.min
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({ value: event.target.value });
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div className={""} >
                <input
                    type="range"
                    min={this.props.min}
                    max={this.props.max}
                    value={this.state.value}
                    onChange={this.onChange}
                    className={"slider"}
                />
            </div>
        );
    }
}

export default FormSlider;