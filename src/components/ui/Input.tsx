import React from "react";

export const Input = React.forwardRef((props: any, ref: any) => {
  return (
    <input
      ref={ref}
      className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
      {...props}
    ></input>
  );
});
