import { useNavigate } from "react-router-dom";

export const Form = ({ children, onSubmit, nextStep, ...props }: any) => {
  const navigate = useNavigate();

  const onSubmitCustom = (e: any) => {
    e.preventDefault();
    onSubmit();
    navigate(nextStep);
  };

  return (
    <form onSubmit={onSubmitCustom} {...props} noValidate>
      {children}
    </form>
  );
};
