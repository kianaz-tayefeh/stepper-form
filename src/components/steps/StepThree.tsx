import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Field, Form, Input, CheckBoxListGroup } from "../ui";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../../context";
import { ConfirmConstant } from "../../constants";
import { IUser } from "../../interfaces/IUser";

const ConfirmSchema = z.object({
  isConfirm: z.nativeEnum(ConfirmConstant),
});

type ConfirmType = z.infer<typeof ConfirmSchema>;

export const StepThree = forwardRef((props, ref) => {
  const { state, setState } = useAppStateContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<ConfirmType>({
    mode: "onChange",
    resolver: zodResolver(ConfirmSchema),
    defaultValues: {
      isConfirm: ConfirmConstant.yes,
    },
  });

  const onSubmit = ({ isConfirm }: ConfirmType) => {
    console.log(state);

    // setState({ ...state, isConfirm });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} nextStep={"/stepFour"}>
      <p className="p-6">Accept the conditions</p>
      {Object.entries(ConfirmConstant).map(([key, val]) => {
        return (
          <>
            <div key={key} className="flex items-center mb-4">
              <Input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-800 focus:ring-2 light:bg-gray-700 light:border-gray-600"
                {...register("isConfirm")}
                aria-invalid={Boolean(errors.isConfirm)}
                id="isConfirm"
                type="radio"
                value={key}
                checked={val === ConfirmConstant.yes}
              />
              <label
                htmlFor="default-radio-1"
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
