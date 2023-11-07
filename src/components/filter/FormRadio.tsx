import { useEffect, useState } from "react";

interface PropsType {
  name: string;
  value: string;
  paramsValue?: string;

  handleGetValue: (x: any) => void;
}
const FormRadio = (props: PropsType) => {
  const { name, value, handleGetValue, paramsValue } = props;
  const [checked, setChecked] = useState(false);
  let params: any;
  if (paramsValue) {
    params = paramsValue.split("-").join(" ");
  }

  useEffect(() => {
    if (value === params) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [checked]);
  return (
    <div>
      <label className="flex gap-x-4 text-sm cursor-pointer">
        <input
          type="radio"
          name={name}
          value={value}
          onClick={(e: any) => {
            checked ? handleGetValue(e.target.value) : handleGetValue("");
            setChecked(!checked);
          }}
          checked={value === params}
        />
        {value}
      </label>
    </div>
  );
};

export default FormRadio;
