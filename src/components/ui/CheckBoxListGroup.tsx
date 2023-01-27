import React from "react";

export const CheckBoxListGroup = React.forwardRef(
  ({ title, checkBoxList, ref, props }: any) => {
    return (
      <>
      <div className="mb-4">
      <h3 className="font-semibold text-gray-900 light:text-white">
          {title}
        </h3>
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg light:bg-gray-700 light:border-gray-600 light:text-white">
          {checkBoxList.map((checkBox: any) => (
            <li
              key={checkBox}
              className="w-full border-b border-gray-200 rounded-t-lg light:border-gray-600"
            >
              <div className="flex items-center pl-3">
                <input
                  ref={ref}
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                  {...props}
                />
                <label
                  htmlFor={checkBox}
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 light:text-gray-300"
                >
                  {checkBox}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    
      </>
    );
  }
);
