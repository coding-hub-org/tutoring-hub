import React from "react";
import "./style.scss";

interface Props {
  title: string;
  boxOptions: any[];
}

export default function Box({ title, boxOptions }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const options: NodeListOf<HTMLElement> | null = document.querySelectorAll(
      `.box-component .box-component--field.${title}`
    );
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "inline-block";
      options[i].style.pointerEvents = "all";
    }
  };

  const handleField = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const boxTitle: HTMLElement | null = document.querySelector(
      `.box-component .box-component--title.${title}`
    );
    const options: NodeListOf<HTMLElement> | null = document.querySelectorAll(
      `.box-component .box-component--field.${title}`
    );
    if (!boxTitle) return;
    boxTitle.innerHTML = event.currentTarget.innerHTML;
    if (!options) return;
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
      options[i].style.pointerEvents = "none";
    }
  };

  const optionsList = boxOptions.map((option: any, idx: number) => {
    return (
      <li
        onClick={handleField}
        className={`box-component--field ${title}`}
        key={idx}
      >
        {option}
      </li>
    );
  });

  return (
    <ul className={"box-component"}>
      <li onClick={handleClick} className={`box-component--title ${title}`}>
        {title}
      </li>
      {optionsList}
    </ul>
  );
}
