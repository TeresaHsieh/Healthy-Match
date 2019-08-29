import React from "react";
import "../../css/common.css";

// Components
import carrot from "../../imgs/carrot.png";
import fish from "../../imgs/fish.png";
import fruit from "../../imgs/fruit.png";
import meat from "../../imgs/meat.png";
import vetgetable from "../../imgs/vetgetable.png";

const Marquee = () => (
  <div className="marquee">
    <div>
      <img src={carrot} />
      <img src={fish} />
      <img src={fruit} />
      <img src={meat} />
      <img src={vetgetable} />
    </div>
  </div>
);

export default Marquee;
