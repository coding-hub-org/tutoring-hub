import React, { Fragment } from "react";
import "./ScaleInput.css";

class ScaleInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedElementName: undefined,
			value: -1
		};

		this.onChange = this.onChange.bind(this);
		this.onRightClick = this.onRightClick.bind(this);
	}

	onChange(e) {
		this.triggerChange(e.target.name);
	}

	onRightClick(e) {
		e.preventDefault();
		this.clear();
	}

	getValueFromName(name) {
		let value = name ? name.replace(this.props.parameter + "-", "") : -1;
		return value;
	}

	triggerChange(elementName) {
		if (elementName) {
			let elemValue = this.getValueFromName(elementName);
			this.setState({
				selectedElementName: elementName,
				value: elemValue
			});
			this.props.onChange(this.props.parameter, elemValue);
		} else {
			this.setState({
				selectedElementName: undefined,
				value: -1
			});
			this.props.onChange(this.props.parameter, -1);
		}
	}

	clear() {
		this.triggerChange(undefined);
	}

	isChecked(name) {
		return this.state.selectedElementName === name;
	}

	render() {
		let inputs = [];
		for (let i = this.props.scaleMin; i <= this.props.scaleMax; i++) {
			var input = (
				<Fragment key={this.props.parameter + "-" + i}>
					<div className={"reating-container"}>
						<input
							type="radio"
							className={"option-input radio"}
							value={i}
							name={this.props.parameter + "-" + i}
							onChange={this.onChange}
							onContextMenu={this.onRightClick}
							checked={this.isChecked(this.props.parameter + "-" + i)}
						/>
						<label htmlFor={this.props.parameter + "-" + i}>{i}</label>
					</div>
				</Fragment>
			);
			inputs.push(input);
		}

		return (
			<div className={"ScaleInput-component"}>
				<p>{this.props.parameter}</p>
				<div className={"ScaleInput-component--wrapper"}>{inputs}</div>
			</div>
		);
	}
}

export default ScaleInput;
