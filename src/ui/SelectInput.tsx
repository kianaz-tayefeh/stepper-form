import React, { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { GENDER_OPTIONS } from "../constants";

type SelectOptionType = {
  value: string;
  label: string;
};

type ControllerSelectPropsType = {
  name: any;
  errors: any;
  control: any;
  options: SelectOptionType[];
};
export const SelectInput: React.FC<ControllerSelectPropsType> = (props) => {
  const { name, errors, control, options } = props;
  const handleChange = useCallback(
    (
      selected: SingleValue<SelectOptionType>,
      onChange: (value: string) => void
    ) => {
      onChange(selected?.value as string);
    },
    [name]
  );

  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...restOfField } }) => (
          <Select
            {...restOfField}
            options={options}
            onChange={(selected) => handleChange(selected, onChange)}
            value={options.filter((option) => option.value === value)}
          />
        )}
      />
    </div>
  );
};
