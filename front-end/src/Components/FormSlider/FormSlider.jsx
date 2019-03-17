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
            <div className={"Form-Slider-Component"} >
                <input
                    type="range"
                    min={this.props.min}
                    max={this.props.max}
                    value={this.state.value}
                    onChange={this.onChange}
                    step={this.step}
                    className={"slider"}
                />
                <div class="label">
                    <span>
                        {(this.state.value == 0) ?
                            "n/a" :
                            this.state.value
                        }
                    </span>
                </div>
            </div>
        );
    }
}

export default FormSlider;