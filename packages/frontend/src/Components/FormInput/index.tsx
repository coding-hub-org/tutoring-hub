import React from "react";
import "./style.scss";

interface Props {
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  handleChange?: any;
  placeholder?: string;
  required?: boolean;
}

export default function FormInput(props: Props) {
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      required={props.required}
    />
  );
}
