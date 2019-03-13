import React, { Component } from 'react';
import './FormDropdown.css';


class FormDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '-- ' + this.props.title + '--'
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({ value: event.target.value });
        this.props.onChange(event.target.value === '-- ' + this.props.title + '--' ? '' : event.target.value);
    }

    render() {

        const options = this.props.options.map((option) =>
            <option value={option} key={option}>{option}</option>
        );

        return (
            <select onChange={this.onChange}>
                <option value={'-- ' + this.props.title + '--'}>-- {this.props.title} --</option>
                {options}
            </select>
        );
    }
}

export default FormDropdown;