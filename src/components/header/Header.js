import React from "react";
import "./Header.css";

const Header = ({ scramble }) => {
  return (
    <header>
      <img
        src="/no-background-cubify-icon.png"
        alt="Cubify Icon"
        className="icon"
      />
      <p className="scramble">{scramble}</p>
    </header>
  );
};

export default Header;
