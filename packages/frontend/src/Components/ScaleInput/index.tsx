import React, { Fragment } from "react";
import "./style.scss";

interface Props {
  parameter: string;
  onChange: any;
  scaleMin: number;
  scaleMax: number;
}

interface State {
  selectedElementName?: string;
  value: number;
}

export default class ScaleInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: -1
    };

    this.onChange = this.onChange.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.triggerChange(event.currentTarget.name);
  }

  onRightClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    event.preventDefault();
    this.clear();
  }

  getValueFromName(name: string) {
    let value = name
      ? parseInt(name.replace(this.props.parameter + "-", ""))
      : -1;
    return value;
  }

  triggerChange(elementName?: string) {
    if (elementName) {
      let elemValue: number = this.getValueFromName(elementName);
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

  isChecked(name: string) {
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
