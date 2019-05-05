import React, { Component } from "react";
import "./FormDropdown.css";

class FormDropdown extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.props.onChange(
			event.target.value === "-- " + this.props.title + "--"
				? "N/A"
				: event.target.value
		);
	}

	render() {
		const options = this.props.options.map(option => (
			<option value={option} key={option}>
				{this.props.uppercase ? option.toUpperCase() : option}
			</option>
		));

		return (
			<select onChange={this.onChange} value={this.props.value}>
				<option value={`-- ${this.props.title}--`}>ALL COURSES</option>
				{options}
			</select>
		);
	}
}

export default FormDropdown;
