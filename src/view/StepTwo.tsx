import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Field, Form, Input, CheckBoxListGroup } from "../ui";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { schema_step2, UserDetailsType } from "../constants/FormSchema";
import { LanguageEnum, LANGUAGES_OPTIONS } from "../constants/options";

export const StepTwo = forwardRef((props, ref) => {
  const { state, setState } = useFormContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<UserDetailsType>({
    mode: "onChange",
    resolver: zodResolver(schema_step2),
    defaultValues: state,
  });

  const onSubmit = (userDetails: UserDetailsType) => {
    console.log(state);

    setState({ ...state, ...userDetails });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} nextStep={"/stepThree"}>
      <div className="grid gap-6 mb-6 md:grid-cols-2 p-4">
        <Field label="Birth Date" error={errors?.birthdate?.message}>
          <Input
            {...register("birthdate")}
            placeholder="Select date"
            aria-invalid={Boolean(errors.birthdate)}
            id="birthdate"
            type="date"
          />
        </Field>

        <Field label="Address" error={errors?.address?.message}>
          <Input
            {...register("address")}
            aria-invalid={Boolean(errors.address)}
            id="address"
          />
        </Field>

        <Field label="Height" error={errors?.height?.message}>
          <Input
            {...register("height", { valueAsNumber: true })}
            aria-invalid={Boolean(errors.height)}
            id="height"
            type="number"
          />
        </Field>
        <Field label="Weight" error={errors?.weight?.message}>
          <Input
            {...register("weight", { valueAsNumber: true })}
            aria-invalid={Boolean(errors.weight)}
            id="weight"
            type="number"
          />
        </Field>

        <CheckBoxListGroup
          title="Languages"
          {...register("languages")}
          aria-invalid={Boolean(errors.languages)}
          checkBoxList={LANGUAGES_OPTIONS}
        />
      </div>
      <div className="grid grid-cols-2 gap-9">
        <Button type="button" variant="gray" onClick={() => navigate("/")}>
          Previous
        </Button>
        {/* disabled={isSubmitting || !isValid} */}

        <Button ref={ref}>Next Step</Button>
      </div>
    </Form>
  );
});
