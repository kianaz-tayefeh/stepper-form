import React from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

export const PhoneInput = React.forwardRef((props: any, ref: any) => {
  return (
    <IntlTelInput
      ref={ref}
      inputClassName="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
      containerClassName="intl-tel-input"
      telInputProps={props}
    />
  );
});
