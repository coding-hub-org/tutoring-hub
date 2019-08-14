import React from "react";
import "./style.scss";
import Box from "../Box";

export default function Filter(coursesSet: any, updateTutorState: any) {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const courses: any = document.querySelectorAll(
      ".box-component .box-component--title"
    );
    const title: string[] = ["courses", "rating", "reviews"];

    // Test single parameter
    const courseParam = document.querySelector(
      ".box-component .box-component--title"
    )!.innerHTML;
    fetch(`/?course=${courseParam}`)
      .then(response => response.json())
      .then(data => {
        updateTutorState(data, courseParam);
      })
      .catch(error => {
        console.log(error);
      });

    [...courses].forEach((c, idx) => {
      c.innerHTML = title[idx];
    });
  };

  const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={"filter-component"}>
      <Box title={"courses"} boxOptions={coursesSet} />
      <Box title={"rating"} boxOptions={ratingOptions} />
      <Box title={"reviews"} boxOptions={coursesSet} />
      <button onClick={handleClick}>Filter</button>
    </div>
  );
}
