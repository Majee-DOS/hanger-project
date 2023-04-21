import React from "react";

const FilterBar: React.FC = () => {
  return (
    <div className="pl-24 bg-orange-50 shadow-lg">
      <ul className="flex">
        <li className="m-6 pr-6">Woman</li>
        <li className="m-6 pr-6">Man</li>
        <li className="m-6 pr-6">Kids</li>
      </ul>
    </div>
  );
};

export default FilterBar;
