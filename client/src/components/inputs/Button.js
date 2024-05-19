import React from "react";

function Button({ name, icon, onClick, color = "#4caf50" }) {
  return (
    <button
      className="add-button "
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {icon && <i className={`fas fa-${icon}`}></i>} {name}
    </button>
  );
}

export default Button;
