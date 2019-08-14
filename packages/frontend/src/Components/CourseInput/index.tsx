import React, { Fragment } from "react";
import "./style.scss";

import _ from "underscore";

interface Props {
  parameter?: string;
  choices?: string[];
  onChange(elementName?: string): void;
}

interface State {
  selectedElementName?: string;
}

export default class CourseInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedElementName: undefined
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

  triggerChange(elementName?: string) {
    if (elementName) {
      this.setState({
        selectedElementName: elementName
      });
      this.props.onChange(elementName);
    } else {
      this.setState({
        selectedElementName: undefined
      });
      this.props.onChange(undefined);
    }
  }

  clear() {
    this.triggerChange(undefined);
  }

  isChecked(name: string) {
    return this.state.selectedElementName === name;
  }

  render() {
    if (!this.props.choices) return null;
    let self = this;
    const inputs = _.sortBy(this.props.choices, (name: string) => {
      return name;
    }).map(function(value: string, index: number) {
      return (
        <Fragment key={value + "-" + index}>
          <div className="CourseInput-component--wrapper-container">
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
      );
    }, this);

    return (
      <div className={"CourseInput-component"}>
        <p>{this.props.parameter}</p>
        <div className={"CourseInput-component--wrapper"}>{inputs}</div>
      </div>
    );
  }
}
