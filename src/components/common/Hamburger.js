import React from "react";
import "../../css/common.css";
import SideDrawer from "../common/SideDrawer";

class Hamburger extends React.Component {
  constructor() {
    super();
    this.state = {
      openHamburger: false
    };
  }

  openSideDrawer = () => {
    this.setState({ openHamburger: true }, () => {
      //callback
      console.log(this.state.openHamburger);
    });
  };

  render() {
    const openHamburger = this.state.openHamburger;

    return (
      <button className="hamburger-button" onClick={this.openSideDrawer}>
        <div className="hamburger-line" />
        <div className="hamburger-line" />
        <div className="hamburger-line" />
        {openHamburger ? <SideDrawer /> : <div></div>}
      </button>
    );
  }
}

export default Hamburger;
