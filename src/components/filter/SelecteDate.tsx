interface PropsType {
  handleDateChange: (data: Date) => void;
  value: any;
}

const SelecteDate = (props: PropsType) => {
  const { handleDateChange, value } = props;
  const formateDate = value ? new Date(value).toISOString().split("T")[0] : "";

  return (
    <div>
      <div className="space-y-1 my-2">
        <span className="text-blue-900 font-semibold">Start Date</span>
        <input
          type="date"
          value={formateDate}
          onChange={(e: any) => handleDateChange(e.target.value)}
          className="border border-gray-300 w-full p-[0.35rem] rounded-md "
        />
      </div>
    </div>
  );
};

export default SelecteDate;
