import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
    <header>
        <ul className="main-nav">
            <li><NavLink to="/daily-record">每日記錄</NavLink></li>
            <li><NavLink to="/history">營養歷史</NavLink></li>
            <li><NavLink to="/match-status">麻吉樂園</NavLink></li>
            <li><NavLink to="/member">會員</NavLink></li>
        </ul>
    </header>
);

export default Header;