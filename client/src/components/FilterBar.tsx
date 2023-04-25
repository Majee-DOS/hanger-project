import React from "react";

interface Props {
  setCategoryFilter: (newState: string) => void;
}

const FilterBar: React.FC<Props> = ({ setCategoryFilter }) => {
  return (
    <div className="pl-24 bg-white shadow-3xl" style={{position: "sticky"}}>
      <ul className="flex text-center">
        <li
          onClick={() => setCategoryFilter("Women")}
          className="m-3 mr-6 p-3 hover:cursor-pointer hover:shadow-xl rounded-xl"
        >
          Woman
        </li>
        <li
          onClick={() => setCategoryFilter("Men")}
          className="m-3 mr-6 p-3 hover:cursor-pointer hover:shadow-xl rounded-xl"
        >
          Man
        </li>
        <li
          onClick={() => setCategoryFilter("Kids")}
          className="m-3 mr-6 p-3 hover:cursor-pointer hover:shadow-xl rounded-xl"
        >
          Kids
        </li>
        <li
          onClick={() => setCategoryFilter("")}
          className="m-3 mr-6 p-3 hover:cursor-pointer hover:shadow-xl rounded-xl"
        >
          All
        </li>
      </ul>
    </div>
  );
};

export default FilterBar;
