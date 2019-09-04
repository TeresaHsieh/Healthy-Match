import React from "react";
import "../../css/404.css";

// App Components
import Header from "../common/Header";
import SadMatch from "../../imgs/sad-match.png";

const NotFound = () => (
  <div>
    <Header />
    <div className="main-404">
      <div>
        <h2 className="code404"> 404 </h2>
        <h2> 喔不！此頁不存在！ </h2>
        <p> 請再次確認網址路徑～麻吉感謝你 ❤️ </p>
      </div>
      <img src={SadMatch} className="sad-match" />
    </div>
  </div>
);

export default NotFound;
