import React from "react";
import { Form } from "react-bootstrap";
import "./form-input.css";
import FormInputProps from "./IFormInputProps";

const FormInput: React.FC<FormInputProps> = ({
  required = false,
  ...props
}) => {
  return <Form.Control {...props} required={required}></Form.Control>;
};

export default FormInput;
