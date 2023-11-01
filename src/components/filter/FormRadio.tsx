interface PropsType {
  name: string;
  title: string;
  value: string | number;
  handleGetValue: (x: any) => void;
}
const FormRadio = (props: PropsType) => {
  const { name, title, value, handleGetValue } = props;
  return (
    <div>
      <label className="flex gap-x-4 text-sm cursor-pointer">
        <input
          type="radio"
          name={name}
          value={value}
          onClick={(e: any) => handleGetValue(e.target.value)}
        />
        {title}
      </label>
    </div>
  );
};

export default FormRadio;
