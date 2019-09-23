import React from "react";
import "../../css/member.css";

// App Components
import Header from "../common/Header";
import LogOut from "../others/ComOfMember/LogOut";

const Member = () => (
  <div>
    <Header />
    <div>
      <div className="black-screen">
        <LogOut />
      </div>
    </div>
  </div>
);

export default Member;
