import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppStateContext } from "../../context";

export const Stepper = ({ onStepChange }: any) => {
  const { state } = useAppStateContext();
  const location = useLocation();
  const [steps, setSteps] = useState<any>([]);

  useEffect(() => {
    setSteps((steps: any) => [...steps, location.pathname]);
  }, [location]);

  const getLinkClass = ({ isActive }: any) =>
    `nav-link ${isActive ? "active" : undefined}`;

  const InfoMissing = !state.name || !state.email;

  const isVisited = (step: any) =>
    steps.includes(step) && location.pathname !== step;

  const navLinks = [
    {
      url: "/",
      title: "step one",
      state: {
        showWarning: isVisited("/") && InfoMissing,
        showSuccess: isVisited("/") && !InfoMissing,
      },
    },
    {
      url: "/stepTwo",
      title: "step two",
      state: {
        showSuccess: isVisited("/stepTwo"),
      },
    },
    {
      url: "/stepThree",
      title: "step three",
      state: {
        showSuccess: isVisited("/stepThree"),
      },
    },
    {
      url: "/stepFour",
      title: "step four",
      state: {},
    },
  ];

  return (
    <div>
      <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base light:bg-gray-800 light:border-gray-900 sm:p-4 sm:space-x-4">
        {navLinks.map(({ url, title, state }) => {
          return (
            <li
              className="flex items-center text-blue-600 dark:text-blue-500"
              key={url}
            >
              <StepState
                showWarning={state.showWarning}
                showSuccess={state.showSuccess}
              />

              <NavLink
                end
                to={url}
                className={getLinkClass}
                onClick={onStepChange}
              >
                <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  2
                </span>
                {title} <span className="hidden sm:inline-flex sm:ml-2"> </span>
              </NavLink>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const StepState = ({ showWarning, showSuccess }: any) => {
  if (showWarning) {
    return <span className={"warning-sign mr-2"}> ! </span>;
  } else if (showSuccess) {
    return (
      <div className="checkmark">
        <div className="circle"></div>
        <div className="stem"></div>
        <div className="tick"></div>
      </div>
    );
  } else {
    return null;
  }
};
