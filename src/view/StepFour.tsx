import { useForm } from "react-hook-form";
import { useFormContext } from "../context/FormContext";
import { IUser } from "../interfaces/IUser";
import { Button, Form, Section, SectionRow } from "../ui";

export const StepFour = () => {
  const { state } = useFormContext();
  const { handleSubmit } = useForm({ defaultValues: state });

  console.log(state);

  const submitData = (data: any) => {
    // Submit data to the server
  };

  const data = [
    {
      title: "Step 1",
      url: "/",
      items: [
        { name: "name", value: state.name, required: true },
        { name: "email", value: state.email },
        { name: "phone", value: state.phone, required: true },
        { name: "gender", value: state.gender },
      ],
    },
    {
      title: "Step 2",
      url: "/stepTwo",
      items: [
        { name: "date of birth", value: state.birthdate },
        { name: "address", value: state.address },
        { name: "spoken language", value: state.languages },
        { name: "height", value: state.height },
        { name: "weight", value: state.weight },
      ],
    },
    {
      title: "Step 3",
      url: "/stepThree",
      items: [{ name: "accept_condition", value: state.accept }],
    },
  ];

  const disableSubmit = data.some((section) =>
    section.items.some((item) => !item.value)
  );

  return (
    <Form onSubmit={handleSubmit(submitData)}>
      <h1 className="mb-4">Confirm</h1>
      {data.map(({ title, url, items }) => {
        return (
          <Section title={title} url={url} key={title}>
            {items.map(({ name, value }) => {
              // const isMissingValue = required && !value;
              return (
                <SectionRow key={name}>
                  {name}: {value}
                  {/* <div className={isMissingValue ? "text-warning" : ""}>
                    {name}
                  </div>
                  <div>
                    {isMissingValue ? (
                      <span className={"warning-sign"}>!</span>
                    ) : (
                      value
                    )} 
                  </div>*/}
                </SectionRow>
              );
            })}
          </Section>
        );
      })}

      <div className="clo-md-12 d-flex justify-content-start">
        <Button disabled={disableSubmit}>Submit</Button>
      </div>
    </Form>
  );
};
