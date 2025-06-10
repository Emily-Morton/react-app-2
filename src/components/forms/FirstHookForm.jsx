import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const initialValues = {
  title: "",
  duration: "",
};

const schema = yup
  .object()
  .shape({
    title: yup.string().max(30).required(),
    duration: yup.string().max(30).required(),
  })
  .required();

function FirstHookForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  useEffect(() => {
    console.log("formState", formState);
    console.log("errors", errors);
  });

  const submitHandler = (values) => console.log(values);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input type="text" {...register("title", { required: true })} />
      {errors.title && <span>{errors.title.message}</span>}
      <input type="text" {...register("duration", { required: true })} />
      {errors.duration && <span>{errors.duration.message}</span>}
      <button type="submit" disabled={isSubmitting || !isValid || !isDirty}>
        Submit
      </button>
    </form>
  );
}
export default FirstHookForm;
