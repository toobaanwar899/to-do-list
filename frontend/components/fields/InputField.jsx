// Custom components
import React from "react";

function InputField(props) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    disabled,
    name,
    onChange,
  } = props;

  return (
    <div className={extra}>
      <label
        htmlFor={id}
        className="text-left block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        disabled={disabled}
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 flex h-12 w-full rounded-xl border border-green-200 bg-white p-3 text-sm outline-none"
      />
    </div>
  );
}

export default InputField;
