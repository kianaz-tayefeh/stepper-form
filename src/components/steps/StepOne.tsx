import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Field, Form, Input, PhoneInput, SelectInput } from "../ui";
import { useAppStateContext } from "../../context";
import { genders } from "../../constants";

type Gender = typeof genders[number]["value"];
// z.enum expects a non-empty array so to work around that
// we pull the first value out explicitly
const VALUES: [Gender, ...Gender[]] = [
  genders[0].value,
  // And then merge in the remaining values from `properties`
  ...genders.slice(1).map((p) => p.value),
];

const userSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name cannot be less than 4 characters" })
    .max(36),
  email: z.string().email({ message: "The email is invalid." }),
  phone: z
    .string()
    .regex(
      new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"),
      "The phone number is not correct"
    ),
  gender: z
    .enum(VALUES)
    .optional()
    .refine(
      (val) => {
        console.log("refine", val);
        return val !== null;
      },
      {
        message: "Please, make a choice!",
      }
    ),
});

type UserType = z.infer<typeof userSchema>;

export const StepOne = forwardRef((props, ref) => {
  const { state, setState } = useAppStateContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<UserType>({
    mode: "onChange",
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      gender: "male",
    },
  });

  const onSubmit = (user: UserType) => {
    console.log(user);

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
        <Field label="Gender" error={errors?.gender?.message}>
          <SelectInput
            {...register("gender")}
            aria-invalid={Boolean(errors.gender)}
            items={genders}
          />
        </Field>
      </div>
      <Button ref={ref}>Next Step</Button>
    </Form>
  );
});
