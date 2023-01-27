import React, {
  useState,
  createContext,
  useCallback,
  ReactNode,
  useContext,
} from "react";
import { AcceptEnum, GenderEnum, LanguageEnum } from "../constants/options";

export type StateType = {
  name: string;
  email: string;
  phone: string;
  gender: GenderEnum;

  birthdate: string;
  address: string;
  height: number;
  weight: number;
  languages: LanguageEnum[];

  accept: AcceptEnum;
};

const defaultValue: StateType = {
  name: "",
  email: "",
  phone: "",
  gender: GenderEnum.other,

  birthdate: "",
  address: "Munchen",
  height: 170,
  weight: 80,
  languages: [LanguageEnum.german],

  accept: AcceptEnum.no,
};

export const FormContext = createContext<FormContextType>(
  {} as FormContextType
);

FormContext.displayName = "FormContext";

type FormProviderPropsType = {
  children: ReactNode;
};
type FormContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

type Props = {
  children: ReactNode;
};

export const FormProvider = ({ children }: Props) => {
  const [state, setState] = useState<StateType>(defaultValue);

  // const dispatch = useCallback((name: string, value: dispatchValueType) => {
  // 	setState((prevState) => ({
  // 		...prevState,
  // 		[name]: value,
  // 	}))
  // }, [])

  const contextValue = { state, setState };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within the AppProvider");
  }
  return context;
}
