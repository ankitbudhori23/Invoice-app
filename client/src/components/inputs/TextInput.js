import React from "react";

function TextInput({
  label,
  name,
  value,
  onChange,
  readOnly,
  type = "text",
  error,
}) {
  return (
    <div className="input-field">
      <label className="input-label">{label}:</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
      <div className="error">{error}</div>
    </div>
  );
}

export default TextInput;
