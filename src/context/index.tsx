import React, { useContext } from "react";
import { ConfirmConstant } from "../constants";
import { IUser } from "../interfaces/IUser";

type AppStateContextType = {
  state: IUser;
  setState: React.Dispatch<React.SetStateAction<IUser>>;
};
const initialValue: IUser = {
  name: "",
  phone: "",
  email: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  spokenLanguage: null,
  weight: null,
  height: null,
  isConfirm: ConfirmConstant.yes,
};

const AppStateContext = React.createContext<null | AppStateContextType>(null);

type Props = {
  children: React.ReactNode;
};

export const AppStateContextProvider = ({ children }: Props) => {
  const [state, setState] = React.useState(initialValue);

  return (
    <AppStateContext.Provider value={{ state, setState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export function useAppStateContext() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}
