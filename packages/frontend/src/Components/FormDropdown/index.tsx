import React, { Component } from "react";
import "./style.scss";


interface Props {
	options: any[];
	onChange?: any;
	uppercase?: boolean;
	title?: string;
	value?: string;
}

export default class FormDropdown extends Component<Props> {
	constructor(props: Props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		this.props.onChange(
			event.target.value === "-- " + this.props.title + "--"
				? ""
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
