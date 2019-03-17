import React, { Component } from 'react';
import './FormSlider.css';

const _ = require('underscore');


class FormSlider extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div className={"Form-Slider-Component"} >
                <input
                    type="range"
                    min={this.props.min}
                    max={this.props.max}
                    value={this.props.value}
                    onChange={this.onChange}
                    step={this.step}
                    className={"slider"}
                />
                <div className="label">
                    <span>
                        {(this.props.value == 0) ?
                            "n/a" :
                            this.props.value
                        }
                    </span>
                </div>
            </div>
        );
    }
}

export default FormSlider;