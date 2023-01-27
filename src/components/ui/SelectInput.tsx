import React, { useState } from "react";
import Select from "react-select/creatable";

export const SelectInput = React.forwardRef(({ items, props }: any, ref) => {
  return <Select ref={ref} options={items} {...props} />;
});
