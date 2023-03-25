import React from "react";
import Container from "@mui/material/Container";
import Form from "../../forms/components/Form";
import useForm from "../../forms/hooks/useForm";
import Joi from "joi";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";

const FormTest = () => {
  const INITIAL_FORM = {
    first: "",
    last: "",
  };

  const schema = {
    first: Joi.string().min(2).required(),
    last: Joi.string().min(2).required(),
  };

  const handleSubmit = (data) => console.log(data);

  const { formValue, ...rest } = useForm(INITIAL_FORM, schema, handleSubmit);

  return (
    <Container
      sx={{
        mt: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        title="Test Form"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        styles={{ maxWidth: "450px" }}
        onChange={rest.validateForm}
        to={ROUTES.SANDBOX}
      >
        <Input
          label="first name"
          name="first"
          data={formValue.data}
          error={formValue.errors.first}
          onChange={rest.handleChange}
        />
        <Input
          label="last name"
          name="last"
          data={formValue.data}
          error={formValue.errors.last}
          onChange={rest.handleChange}
        />
      </Form>
    </Container>
  );
};

export default FormTest;
