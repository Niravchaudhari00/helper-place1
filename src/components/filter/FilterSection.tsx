import { BiReset } from "react-icons/bi";
import FormSelect from "./FormSelect";
import { useState } from "react";
import FormRadio from "./FormRadio";
import SelecteDate from "./SelecteDate";
import { RxCross2 } from "react-icons/rx";
interface PropsType {
  filterOpenModal: boolean;
  handleFilterOpenModal: (x: boolean) => void;
}
export interface JobLocationType {
  id: number;
  locationName: string;
}

const FilterSection = (props: PropsType) => {
  const { filterOpenModal, handleFilterOpenModal } = props;
  const [jobLocation, setJobLocation] = useState<JobLocationType[]>([
    {
      id: 1,
      locationName: "Hong Kong",
    },
    {
      id: 2,
      locationName: "Singapore",
    },
    {
      id: 3,
      locationName: "Macau",
    },
  ]);

  return (
    <div
      className={`${
        filterOpenModal
          ? "fixed inset-0 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-5 backdrop-blur-sm z-[1000]"
          : "hidden lg:w-1/2 lg:block"
      }`}
    >
      <div
        className={`${
          filterOpenModal
            ? `w-[500px] shadow rounded-lg bg-white p-5 border border-gray-400`
            : "p-5 border border-gray-400 my-10 shadow rounded-lg bg-bannerBgColor"
        }`}
      >
        {filterOpenModal && (
          <div className="h-[40px] flex items-center justify-between  mb-4 font-semibold text-2xl border-b-[.2rem] border-yellowbtn">
            <h1 className="text-blue-900">Filter</h1>
            <span onClick={() => handleFilterOpenModal(false)}>
              <RxCross2 />
            </span>
          </div>
        )}

        <h1 className="text-2xl"> I'm Looking For</h1>
        {!filterOpenModal && (
          <div className="flex justify-between mt-5 text-lg font-semibold">
            <p className="text-blue-900">Filter</p>
            <button className="flex items-center justify-center gap-1 text-greenbtn ">
              <span>
                <BiReset />
              </span>
              Reset
            </button>
          </div>
        )}

        {/* filter section */}
        <div>
          <FormSelect
            title="Job Location"
            placeholder="Job Position"
            value={jobLocation}
          />
          <FormRadio title="Job Position" />
          <SelecteDate />

          <FormRadio title="Job Type" />
          <FormSelect
            title="Contract Status"
            placeholder="Contract Status"
            value={jobLocation}
          />

          <FormRadio title="Post by" />

          <FormSelect
            title="Langauge"
            placeholder="Search"
            value={jobLocation}
          />
          <FormSelect
            title="Main Skills"
            placeholder="Search"
            value={jobLocation}
          />
        </div>
        {filterOpenModal && (
          <div className="mt-5 flex gap-x-3 justify-end">
            <button className="btn-style bg-greenbtn">Reset</button>
            <button
              onClick={() => handleFilterOpenModal(false)}
              className="btn-style bg-yellowbtn"
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
