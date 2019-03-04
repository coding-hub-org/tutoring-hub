import React from "react";
import "./QuestionTile.css";

const QuestionTile = ({ parameter, updateStats }) => {
  const handleChange = e => {
    updateStats(e, e.target.value);
  };

  const areas = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten"
  ];
  const areasInput = [
    "inputOne",
    "inputTwo",
    "inputThree",
    "inputFour",
    "inputFive",
    "inputSix",
    "inputSeven",
    "inputEight",
    "inputNine",
    "inputTen"
  ];

  const getStyle = index => {
    return {
      gridArea: areas[index]
    };
  };

  return (
    <div className={"questiontile-component"}>
      <p>{parameter}</p>
      <div
        onChange={handleChange}
        className={"questiontile-component--wrapper"}
      >
        <input
          type="radio"
          className={"option-input radio"}
          value="1"
          name={parameter}
        />
        <span>
          <label htmlFor="1">1</label>
        </span>
        <input
          type="radio"
          className={"option-input radio"}
          value="2"
          name={parameter}
        />
        <span>
          <label htmlFor="2">2</label>
        </span>
        <input
          type="radio"
          className={"option-input radio"}
          value="3"
          name={parameter}
        />
        <span>
          <label htmlFor="3">3</label>
        </span>
        <input
          type="radio"
          className={"option-input radio"}
          value="4"
          name={parameter}
        />
        <span>
          <label htmlFor="4">4</label>
        </span>
        <input
          type="radio"
          className={"option-input radio"}
          value="5"
          name={parameter}
        />
        <span>
          <label htmlFor="5">5</label>
        </span>
        <input
          type="radio"
          className={"option-input radio"}
          value="6"
          name={parameter}
        />
        <span>
          <label htmlFor="6">6</label>
        </span>
        <input
          type="radio"
          className={"option-input radio"}
          value="7"
          name={parameter}
        />
        <span>
          <label htmlFor="7">7</label>
        </span>
        <input
          type="radio"
          className={"option-input radio"}
          value="8"
          name={parameter}
        />
        <span>
          <label htmlFor="8">8</label>
        </span>
        <input
          type="radio"
          className={"option-input radio"}
          value="9"
          name={parameter}
        />
        <span>
          <label htmlFor="9">9</label>
        </span>
        <input
          type="radio"
          className={"option-input radio"}
          value="10"
          name={parameter}
        />
        <span>
          <label htmlFor="10">10</label>
        </span>
      </div>
    </div>
  );
};

export default QuestionTile;
