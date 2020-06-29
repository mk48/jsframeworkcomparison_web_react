import React from "react";
import "./dashboard.css";

const Company = ({ name, stock }) => {
  return (
    <div className="company">
      <div>{name}</div>
      {stock}
    </div>
  );
};

export default Company;
