import Select, { components } from "react-select";
import { JobLocationType } from "./FilterSection";
import { useState } from "react";

interface PropsType {
  title: string;
  placeholder: string;
  value: JobLocationType[];
}

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}: any) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex",
    rowGap: "5",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input className="mr-3" type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
};

const FormSelect = (props: PropsType) => {
  const { title, placeholder } = props;

  const allOptions: any = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  console.log("selectedOptions: ", selectedOptions);
  return (
    <div className="my-2">
      <h2 className="font-semibold text-blue-900 my-1 capitalize">{title}</h2>
      <Select
        // defaultValue={[]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        options={allOptions}
        onChange={(options) => {
          if (Array.isArray(options)) {
            setSelectedOptions(options?.map((opt: any) => opt.value));
          }
        }}
        components={{
          Option: InputOption,
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormSelect;
