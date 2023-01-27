import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Field, Form, Input, CheckBoxListGroup } from "../ui";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../../context";

const spokenLanguages = ["german", "french", "spanish", "italian"] as const;

const userDetailsSchema = z.object({
  dateOfBirth: z.string(),
  address: z.string(),
  spokenLanguage: z.union([z.enum(spokenLanguages), z.null()]),
  height: z
    .union([z.number({ invalid_type_error: "please enter number" }), z.null()])
    .refine((val) => val !== null && 45 <= +val && +val <= 250, {
      message: "height must between 45 and 250",
    }),
  weight: z
    .union([z.number({ invalid_type_error: "please enter number" }), z.null()])
    .refine((val) => val !== null && 100 <= +val && +val <= 230, {
      message: "weight must between 100 and 230",
    }),
});

type UserDetailsType = z.infer<typeof userDetailsSchema>;

export const StepTwo = forwardRef((props, ref) => {
  const { state, setState } = useAppStateContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<UserDetailsType>({
    mode: "onChange",
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      dateOfBirth: "",
      address: "",
      spokenLanguage: null,
      weight: null,
      height: null,
    },
  });

  const onSubmit = (userDetails: UserDetailsType) => {
    console.log(state);

    setState({ ...state, ...userDetails });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} nextStep={"/stepThree"}>
      <div className="grid gap-6 mb-6 md:grid-cols-2 p-4">
        <Field label="Date Of Birth" error={errors?.dateOfBirth?.message}>
          <Input
            {...register("dateOfBirth")}
            placeholder="Select date"
            aria-invalid={Boolean(errors.dateOfBirth)}
            id="dateOfBirth"
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
          title="Spoken Languages"
          {...register("spokenLanguage")}
          aria-invalid={Boolean(errors.spokenLanguage)}
          checkBoxList={spokenLanguages}
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
