import { useState } from "react";
import { FaFilter } from "react-icons/fa";
// interface PropsType{

// }
const OrderByAndFilter = ({
  handleFilterOpenModal,
}: {
  handleFilterOpenModal: (x: boolean) => void;
}) => {
  return (
    <div>
      <div className="w-11/12 px-1 mx-auto flex lg:flex-row-reverse justify-between items-center">
        <div className="flex flex-wrap items-center justify-center gap-1">
          <span className="capitalize text-blue-900 font-bold">
            order by :{" "}
          </span>
          <select name="" id="" className="border border-black p-1 px-3 ">
            <option className="rounded-none" value="">
              Last Active
            </option>
            <option value="">Last Active</option>
          </select>
        </div>
        {/* filter button show when mobile view */}
        <button
          onClick={() => handleFilterOpenModal(true)}
          className="btn-style bg-blue-900 flex items-center justify-center gap-x-2 lg:hidden"
        >
          <span>
            <FaFilter />
          </span>
          Filter
        </button>
      </div>
    </div>
  );
};

export default OrderByAndFilter;
