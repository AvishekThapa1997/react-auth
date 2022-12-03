import React from "react";
import { Form } from "react-bootstrap";
import FormInputProps from "./IFormInputProps";

const FormInputPassword: React.FC<Omit<FormInputProps, "type" | "required">> = (
  props
) => {
  return <Form.Control {...props}></Form.Control>;
};

export default FormInputPassword;
