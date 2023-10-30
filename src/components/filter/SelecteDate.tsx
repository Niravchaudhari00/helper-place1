import React, { useState } from "react";

const SelecteDate = () => {
  const [selectData, setSelectedDate] = useState();
  console.log("selectData: ", selectData);

  const handleDateChange = (data: any) => {
    setSelectedDate(data);
  };
  return (
    <div>
      <div className="space-y-1 my-2">
        <span className="text-blue-900 font-semibold">Start Date</span>
        <input
          type="date"
          onChange={(e) => handleDateChange(e.target.value)}
          className="border w-full p-2"
        />
      </div>
    </div>
  );
};

export default SelecteDate;
