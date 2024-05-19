import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  const { name } = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-main">
          Invoice App
        </Link>
      </div>
      <div className="user-info">
        <span
          className="username"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {name}
        </span>
        {dropdownOpen && (
          <div className="dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
