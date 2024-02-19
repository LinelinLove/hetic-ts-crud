// import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h2>
        <Link to="/">Company</Link>
      </h2>
    </header>
  );
}
