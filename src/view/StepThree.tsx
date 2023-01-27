import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Field, Form, Input, CheckBoxListGroup } from "../ui";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { IUser } from "../interfaces/IUser";
import { ConfirmType, schema_step3 } from "../constants/FormSchema";
import { AcceptEnum, YES_NO_OPTIONS } from "../constants/options";

export const StepThree = forwardRef((props, ref) => {
  const { state, setState } = useFormContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<ConfirmType>({
    mode: "onChange",
    resolver: zodResolver(schema_step3),
    defaultValues: state,
  });

  const onSubmit = ({ accept }: ConfirmType) => {
    setState({ ...state, accept });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} nextStep={"/stepFour"}>
      <p className="p-6">Accept the conditions</p>
      {Object.entries(YES_NO_OPTIONS).map(([key, val]) => {
        return (
          <>
            <div key={key} className="flex items-center mb-4">
              <Input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-800 focus:ring-2 light:bg-gray-700 light:border-gray-600"
                {...register("accept")}
                aria-invalid={Boolean(errors.accept)}
                id="accept"
                type="radio"
                value={val}
                checked={val === AcceptEnum.yes}
              />
              <label
                htmlFor="accept"
                className="ml-2 text-sm font-medium text-gray-900 light:text-gray-300"
              >
                {val}
              </label>
            </div>
          </>
        );
      })}

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
