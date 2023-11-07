import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
export interface OrderBy {
  id: number;
  value: string;
  label: string;
}
interface PropsType {
  handleOpenFilterModal: (x: boolean) => void;
}

const arrOfOrderBy: OrderBy[] = [
  { id: 1, value: "last_active", label: "Last Active" },
  { id: 2, value: "available_from", label: "Available From" },
  { id: 3, value: "publish_date", label: "Publish Date" },
];

const OrderByAndFilter = (props: PropsType) => {
  const { handleOpenFilterModal } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const [orderByValue, setOrderByValue] = useState<string>();

  const handlerQueryParams = (key: string, value: any) => {
    if (value) {
      let params = new URLSearchParams(searchParams);
      params.set(key, value);
      setSearchParams(params);
    } else {
      let params = new URLSearchParams(searchParams);
      params.delete(key);
      setSearchParams(params);
    }
  };

  useEffect(() => {
    let order = searchParams.get("order_by");
    order ? setOrderByValue(order) : setOrderByValue("");
  }, [searchParams]);

  const handleOrderValue = (order: string) => {
    if (order) {
      handlerQueryParams("order_by", order);
    }
  };
  return (
    <div>
      <div className="w-11/12 px-1 mx-auto flex lg:flex-row-reverse justify-between items-center">
        <div className="flex flex-wrap items-center justify-center gap-1">
          <span className="capitalize text-blue-900 font-bold hidden sm:block">
            order by :
          </span>
          <select
            value={orderByValue}
            onChange={(e: any) => {
              handleOrderValue(e.target.value);
            }}
            className="border border-gray-300 outline-[0.1rem] outline-blue-500/50 p-1 px-3 "
          >
            {arrOfOrderBy.map((opation) => (
              <option
                key={opation.id}
                className="capitalize text-sm"
                value={opation.value}
              >
                {opation.label}
              </option>
            ))}
          </select>
        </div>
        {/* filter button show when mobile view */}
        <button
          onClick={() => handleOpenFilterModal(true)}
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
