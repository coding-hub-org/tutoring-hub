import React from "react";
import "./style.scss";

import loadingIcon from "../../Assets/loading-icon.png";

export default class LoadingSplash extends React.Component {
  render() {
    return (
      <div className={"loading-component"}>
        <div className={"loading"}>
          <img src={loadingIcon} alt="" />
        </div>
      </div>
    );
  }
}
