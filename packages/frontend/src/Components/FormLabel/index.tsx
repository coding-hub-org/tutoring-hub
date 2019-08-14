import React from "react";
import "./style.scss";

interface Props {
  name?: string;
  labelText?: string;
}

export default function FormLabel(props: Props) {
  return <label htmlFor={props.name}>{props.labelText}</label>;
}
