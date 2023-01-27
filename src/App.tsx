import { useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  StepFour,
  StepOne,
  Stepper,
  StepThree,
  StepTwo,
} from "./components/steps";
import { AppStateContextProvider } from "./context";

import "./App.css";

function App() {
  const buttonRef = useRef<any>();

  const onStepChange = () => {
    buttonRef.current?.click();
  };
  return (
    <div className="App">
      <AppStateContextProvider>
        <BrowserRouter>
          <Stepper onStepChange={onStepChange} />
          <Routes>
            <Route path="/" element={<StepOne ref={buttonRef} />} />
            <Route path="/stepTwo" element={<StepTwo ref={buttonRef} />} />
            <Route path="/stepThree" element={<StepThree ref={buttonRef} />} />
            <Route path="/stepFour" element={<StepFour />} />
            {/* <Route path="/stepFour" element={<Confirm ref={buttonRef} />} /> */}
          </Routes>
        </BrowserRouter>
      </AppStateContextProvider>
    </div>
  );
}

export default App;
