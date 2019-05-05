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
		if (event.target.value === "-- " + this.props.title + "--")
		{
			this.props.onChange("N/A");
			let getActive = document.querySelector('.active');
			if (getActive===null) return;
			getActive.classList.toggle("active");
		}
		else
		{
			let course= event.target.value;
			this.props.onChange(course);
			let getClick = document.querySelector(`.js-${course}`);
			let getActive = document.querySelector('.active');
			if (getActive!==null) 
				getActive.classList.toggle("active");
			if (getClick !==null)
				getClick.classList.toggle("active");
		}
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
