import React from "react";
import logo from "../assets/logo.png";
import { ModeToggle } from "./mode-toggle";
function Header() {
  return (
    <div className=" mx-auto p-4 flex justify-between items-center">
      <img src={logo} className="w-10 h-10" />
      <ModeToggle />
    </div>
  );
}

export default Header;
