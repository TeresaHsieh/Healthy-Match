// All imports
import React from "react";

// App Components and CSS
import Header from "../common/Header";
import SadMatch from "../../imgs/sad-match.png";
import "../../css/404.css";

const NotFound = () => (
  <div>
    <Header />
    <div className="main-404">
      <div>
        <h1 className="code404"> 404 </h1>
        <h2> 喔不！此頁不存在！ </h2>
        <p> 請再次確認網址路徑～麻吉感謝你 ❤️ </p>
      </div>
      <img src={SadMatch} className="sad-match" />
    </div>
  </div>
);

export default NotFound;
