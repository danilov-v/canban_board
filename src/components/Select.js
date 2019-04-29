import React from 'react';

const Select = ({ options, value, onChange }) => {
  return (
    <select className="select-css" value={value} onChange={onChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
