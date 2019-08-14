import React, { Component } from "react";
import "./style.scss";
// const _ = require("underscore");

interface Props {
  min: number;
  max: number;
  step: number;
  value?: number;
  onChange: any;
}

interface State {}

export default class FormSlider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className={"Form-Slider-Component"}>
        <input
          type="range"
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onChange={this.onChange}
          step={this.props.step}
          className={"slider"}
        />
        <div className="label">
          <span>{this.props.value === 0 ? "ALL" : this.props.value}</span>
        </div>
      </div>
    );
  }
}
