interface PropsType {
  title: string;
}
const FormRadio = (props: PropsType) => {
  const { title } = props;

  return (
    <div className="">
      <h2 className="border-b-[0.2rem] pb-1 border-greenbtn text-blue-900 font-semibold">
        {title}
      </h2>
      <div className="flex gap-x-4 mt-2">
        <input type="radio" />
        <span>Domestic Helper</span>
      </div>
    </div>
  );
};

export default FormRadio;
