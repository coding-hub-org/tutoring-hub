import React, { Fragment } from "react";
import "./style.scss";

interface Props {
  onChange: any;
  choices: any[];
  parameter?: string;
}

interface State {
  selectedElementName?: string | null;
}

export default class YesNoInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedElementName: null
    };

    this.onChange = this.onChange.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.triggerChange(event.target.name);
  }

  onRightClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    event.preventDefault();
    this.clear();
  }

  triggerChange(elementName?: string | null) {
    if (elementName) {
      this.setState({
        selectedElementName: elementName
      });
      this.props.onChange(elementName);
    } else {
      this.setState({
        selectedElementName: null
      });
      this.props.onChange(undefined);
    }
  }

  clear() {
    this.triggerChange(null);
  }

  isChecked(name: string) {
    return this.state.selectedElementName === name;
  }

  render() {
    let self = this;

    const inputs = this.props.choices.map((value, index) => (
      <Fragment key={value + "-" + index}>
        <div className="YesNoInput-component--wrapper-container">
          <input
            type="radio"
            className={"option-input radio"}
            value={value}
            name={value}
            onChange={self.onChange}
            onContextMenu={self.onRightClick}
            checked={self.isChecked(value)}
          />
          <label htmlFor={value}>{value}</label>
        </div>
      </Fragment>
    ));

    return (
      <div className={"YesNoInput-component"}>
        <p>{this.props.parameter}</p>
        <div className={"YesNoInput-component--wrapper"}>{inputs}</div>
      </div>
    );
  }
}
