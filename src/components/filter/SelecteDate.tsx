const SelecteDate = ({
  handleDateChange,
}: {
  handleDateChange: (data: Date) => void;
}) => {
  // setSelectedDate(data);
  return (
    <div>
      <div className="space-y-1 my-2">
        <span className="text-blue-900 font-semibold">Start Date</span>
        <input
          type="date"
          onChange={(e: any) => handleDateChange(e.target.value)}
          className="border border-gray-300 w-full p-[0.35rem] rounded-md "
        />
      </div>
    </div>
  );
};

export default SelecteDate;
