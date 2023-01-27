import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Field, Form, Input, PhoneInput, SelectInput } from "../ui";
import { useFormContext } from "../context/FormContext";
import { schema_step1, UserType } from "../constants/FormSchema";
import { GenderEnum, GENDER_OPTIONS } from "../constants/options";

export const StepOne = forwardRef((props, ref) => {
  const { state, setState } = useFormContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserType>({
    mode: "onChange",
    resolver: zodResolver(schema_step1),
    defaultValues: state,
  });

  const onSubmit = (user: UserType) => {
    setState({ ...state, ...user });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} nextStep={"/stepTwo"}>
      <div className="grid gap-6 mb-6 md:grid-cols-2 p-4">
        <Field label="Name" error={errors?.name?.message}>
          <Input
            {...register("name")}
            aria-invalid={Boolean(errors.name)}
            id="name"
          />
        </Field>

        <Field label="Email" error={errors?.email?.message}>
          <Input
            {...register("email")}
            type="email"
            aria-invalid={Boolean(errors.email)}
            id="email"
          />
        </Field>
        <Field label="Phone" error={errors?.phone?.message}>
          <Input
            {...register("phone")}
            type="tel"
            aria-invalid={Boolean(errors.phone)}
            id="phone"
          />
        </Field>
        {/* <Field label="Gender" error={errors?.gender?.message}></Field> */}
        <SelectInput
          name="gender"
          control={control}
          errors={errors}
          options={GENDER_OPTIONS}
        />
      </div>
      <Button ref={ref}>Next Step</Button>
    </Form>
  );
});
