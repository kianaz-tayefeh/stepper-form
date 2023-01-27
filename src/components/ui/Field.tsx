import React from "react";

export const Field = ({ children, label, error }: any) => {
  const id = getChildId(children);

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
      >
        {label}
      </label>
      {children}

      {error && <small className="text-red-500 text-xs italic">{error}</small>}
    </div>
  );
};

// Get id prop from a child element
export const getChildId = (children: any) => {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
};
