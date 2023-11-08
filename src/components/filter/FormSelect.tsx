import { useEffect, useState } from "react";
import Select, { components } from "react-select";

interface PropsType {
  title: string;
  placeholder: string;
  option: any;
  type: string;
  handleOptionValue: (data: any[], selectType: string) => void;
  selectedValue?: any[];
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
    rowGap: "3",
    fontSize: "0.85rem",
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
      <input className="mr-2" type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
};

const FormSelect = (props: PropsType) => {
  const { title, placeholder, option, type, handleOptionValue, selectedValue } =
    props;

  const [optionValue, setOptionValue] = useState<any[]>([]);
  const [value, setValue] = useState<any[]>([]);

  const cLocation = (location: any[]) => {
    return location.map((data: any) => {
      return {
        id: data.country_id,
        value: data.country_name,
        label: data.country_name,
      };
    });
  };

  const cStatus = (sts: any[]) => {
    return sts.map((data: any) => {
      return {
        id: data.contract_sts_id,
        value: data.contract_sts_name,
        label: data.contract_sts_name,
      };
    });
  };

  const cLanguage = (langSkill: any[]) => {
    return langSkill.map((data: any) => {
      return {
        id: data.skill_id,
        value: data.skill_name,
        label: data.skill_name,
      };
    });
  };

  const cMainSkill = (mainSkill: any[]) => {
    return mainSkill.map((data: any) => {
      return {
        id: data.skill_id,
        value: data.skill_name,
        label: data.skill_name,
      };
    });
  };

  useEffect(() => {
    switch (type) {
      case "CANDIDATE": {
        if (selectedValue) {
          setValue(cLocation(selectedValue));
        }
        break;
      }
      case "CONTRACT_STS": {
        if (selectedValue) {
          setValue(cStatus(selectedValue));
        }
        break;
      }
      case "LANGUAGE": {
        if (selectedValue) {
          setValue(cLanguage(selectedValue));
        }
        break;
      }
      case "MAIN_SKILL": {
        if (selectedValue) {
          setValue(cMainSkill(selectedValue));
        }
      }
    }
  }, [selectedValue]);
  useEffect(() => {
    switch (type) {
      case "CANDIDATE": {
        setOptionValue(cLocation(option));
        break;
      }
      case "CONTRACT_STS": {
        setOptionValue(cStatus(option));
        break;
      }
      case "LANGUAGE": {
        let langSkillCtg = option.skill_category.filter(
          (data: any) => data.skill_category_name === "Language"
        );
        let lSkill = option.skills.filter(
          (data: any) =>
            data.skill_category_id === 1 &&
            langSkillCtg[0].skill_category_id === 1
        );
        setOptionValue(cLanguage(lSkill));
        break;
      }
      case "MAIN_SKILL": {
        let mainSkillCtg = option.skill_category.filter(
          (data: any) => data.skill_category_name === "Main Skills"
        );
        let Skill = option.skills.filter(
          (data: any) =>
            data.skill_category_id === 4 &&
            mainSkillCtg[0].skill_category_id === 4
        );
        setOptionValue(cMainSkill(Skill));
        break;
      }
    }
  }, []);

  return (
    <div className="my-2">
      <h2 className="font-semibold text-blue-900 my-1 capitalize">{title}</h2>
      <Select
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        options={optionValue}
        value={value}
        onChange={(optionValue) => {
          if (Array.isArray(optionValue)) {
            handleOptionValue(
              optionValue?.map((opt: any) => opt.value),
              type
            );
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
