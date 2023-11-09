import { useForm, SubmitHandler, Resolver } from "react-hook-form";
type FormValues = {
  firstName: string;
  lastName: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} placeholder="Bill" />
        {errors?.firstName && <p>{errors.firstName.message}</p>}

        <input {...register("lastName")} placeholder="Luo" />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
