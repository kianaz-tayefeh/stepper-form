import { forwardRef, useImperativeHandle, useRef } from "react";

export const Button = forwardRef(
  ({ children, variant = "blue", ...props }: any, ref) => {
    const buttonRef = useRef<any>();

    useImperativeHandle(ref, () => ({
      click: () => {
        buttonRef.current?.click();
      },
    }));

    return (
      <button
        className={`float-right w-auto  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-${variant}-500 hover:border-transparent rounded`}
        {...props}
        ref={buttonRef}
      >
        {children}
      </button>
    );
  }
);
