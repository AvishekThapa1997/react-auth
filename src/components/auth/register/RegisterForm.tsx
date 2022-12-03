import React, { useState, useCallback, useMemo } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CONSTANTS from "../../../constants/constants";
import useDebounce from "../../../hooks/useDebounce";
import {
  isValidEmail,
  isNotEmpty,
  isValidPassword,
  isPasswordMatch,
  isValidPhoneNumber,
} from "../../../util/validation";

import Center from "../../shared/center/Center";
import FormInput from "../../shared/form/FormInput";
import withPasswordVisibility from "../../shared/form/withPasswordVisibility";
import IRegisterState from "./IRegisterState";

const defaultRegisterFormState: IRegisterState = {
  userName: {
    value: "",
    isValid: false,
    error: null,
    isFocus: false,
  },
  email: {
    value: "",
    isValid: false,
    error: null,
    isFocus: false,
  },
  password: {
    value: "",
    isFocus: false,
    error: null,
    isValid: false,
  },
  confirmPassword: {
    value: "",
    isFocus: false,
    error: null,
    isValid: false,
  },
  phoneNumber: {
    value: "",
    isFocus: false,
    error: null,
    isValid: false,
  },
};
const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [registerFormState, setRegisterFormState] = useState(
    defaultRegisterFormState
  );
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const passwordVisibilityHandler = (event: React.MouseEvent) => {
    setPasswordVisibility((prevState) => prevState);
  };
  const navigateHandler = () => {
    navigate(-1);
  };
  console.log({ registerFormState });
  const userNameInputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const userName = event.target.value;
      const isValid = isNotEmpty(userName);
      setRegisterFormState((prevState) => ({
        ...prevState,
        userName: {
          ...prevState.userName,
          isValid,
          error: !isValid ? CONSTANTS.ERRORS.INVALID_USERNAME : null,
          value: userName,
        },
      }));
    },
    [setRegisterFormState]
  );
  const emailInputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const email = event.target.value;
      const isValid = isValidEmail(email);
      setRegisterFormState((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          isValid,
          error: !isValid ? CONSTANTS.ERRORS.INVALID_EMAIL : null,
          value: email,
        },
      }));
    },
    [setRegisterFormState]
  );
  const passwordInputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const password = event.target.value;
      const isValid = isValidPassword(password);
      setRegisterFormState((prevState) => ({
        ...prevState,
        password: {
          ...prevState.email,
          isValid,
          error: !isValid ? CONSTANTS.ERRORS.INVALID_PASSWORD : null,
          value: password,
        },
      }));
    },
    [setRegisterFormState]
  );
  const confirmPasswordInputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const confirmPassword = event.target.value;
      const isValid = isPasswordMatch(
        registerFormState.password.value,
        confirmPassword
      );
      setRegisterFormState((prevState) => ({
        ...prevState,
        confirmPassword: {
          ...prevState.confirmPassword,
          isValid,
          error: !isValid ? CONSTANTS.ERRORS.PASSWORD_DID_NOT_MATCH : null,
          value: confirmPassword,
        },
      }));
    },
    [setRegisterFormState, registerFormState.password.value]
  );
  const phoneNumberInputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const phoneNumber = event.target.value;
      const isValid = isValidPhoneNumber(phoneNumber);
      setRegisterFormState((prevState) => ({
        ...prevState,
        phoneNumber: {
          ...prevState.phoneNumber,
          isValid,
          error: !isValid ? CONSTANTS.ERRORS.INVALID_PHONE_NUMBER : null,
          value: phoneNumber,
        },
      }));
    },
    [setRegisterFormState]
  );
  const debouncedUserNameInputChangeHandler = useDebounce(
    userNameInputChangeHandler,
    CONSTANTS.DEBOUNCE_DELAY
  );
  const debouncedEmailInputChangeHandler = useDebounce(
    emailInputChangeHandler,
    CONSTANTS.DEBOUNCE_DELAY
  );
  const debouncedPasswordInputChangeHandler = useDebounce(
    passwordInputChangeHandler,
    CONSTANTS.DEBOUNCE_DELAY
  );
  const debouncedConfirmPasswordInputChangeHandler = useDebounce(
    confirmPasswordInputChangeHandler,
    CONSTANTS.DEBOUNCE_DELAY
  );
  const debouncedPhoneNumberInputChangeHandler = useDebounce(
    phoneNumberInputChangeHandler,
    CONSTANTS.DEBOUNCE_DELAY
  );
  const inputFocusHandler = (event: React.FocusEvent) => {
    const inputElement = event.target as HTMLInputElement;
    const key = inputElement.dataset.key! as keyof IRegisterState;
    if (!registerFormState[key]) {
      return;
    }
    setRegisterFormState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        isFocus: true,
      },
    }));
  };
  const inputBlurHandler = (event: React.FocusEvent) => {
    const inputElement = event.target as HTMLInputElement;
    const key = inputElement.dataset.key! as keyof IRegisterState;
    if (!registerFormState[key]) {
      return;
    }
    setRegisterFormState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        isFocus: false,
        error: inputElement.value === "" ? null : prevState[key].error,
      },
    }));
  };
  const disableFormSubmitButton = Object.entries(registerFormState).reduce(
    (status, [_property, data]) => {
      return status || !data.isValid;
    },
    false
  );
  const PasswordInput = useMemo(() => withPasswordVisibility(FormInput), []);
  const ConfirmPasswordInput = useMemo(
    () => withPasswordVisibility(FormInput),
    []
  );
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ registerFormState });
  };
  return (
    <>
      <Form>
        <Card>
          <Card.Header>
            <Card.Title className="text-capitalize text-center mx-2">
              register
            </Card.Title>
          </Card.Header>
          <Card.Body className="my-3">
            <InputGroup className="mb-4" size="sm">
              <InputGroup.Text>
                <FaUserAlt />
              </InputGroup.Text>
              <FormInput
                placeholder="Enter username"
                required
                type="text"
                size="lg"
                onChange={debouncedUserNameInputChangeHandler}
                isInvalid={!!registerFormState.userName.error}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                data-key="userName"
              />
              <Form.Control.Feedback type="invalid" className="fw-bold">
                {registerFormState.userName.error}
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-4" size="sm">
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <FormInput
                placeholder="Enter email"
                required
                size="lg"
                onChange={debouncedEmailInputChangeHandler}
                isInvalid={!!registerFormState.email.error}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                type="email"
                data-key="email"
              />
              <Form.Control.Feedback type="invalid" className="fw-bold">
                {registerFormState.email.error}
              </Form.Control.Feedback>
            </InputGroup>
            <PasswordInput
              placeholder="Enter password"
              required
              size="lg"
              type="password"
              onChange={debouncedPasswordInputChangeHandler}
              isInvalid={!!registerFormState.password.error}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              error={registerFormState.password.error}
              data-key="password"
            />
            <ConfirmPasswordInput
              placeholder="Confirm password"
              required
              type="password"
              size="lg"
              onChange={debouncedConfirmPasswordInputChangeHandler}
              isInvalid={!!registerFormState.confirmPassword.error}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              data-key="confirmPassword"
              error={registerFormState.confirmPassword.error}
            />
            <InputGroup className="mb-4" size="sm">
              <InputGroup.Text>
                <FaPhoneAlt />
              </InputGroup.Text>
              <FormInput
                placeholder="Enter phone number"
                required
                type="number"
                size="lg"
                onChange={debouncedPhoneNumberInputChangeHandler}
                isInvalid={!!registerFormState.phoneNumber.error}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                data-key="phoneNumber"
              />
              <Form.Control.Feedback type="invalid" className="fw-bold">
                {registerFormState.phoneNumber.error}
              </Form.Control.Feedback>
            </InputGroup>
            <Center>
              <Button
                variant="primary"
                type="submit"
                className="text-capitalize px-4 py-2"
                disabled={disableFormSubmitButton}
              >
                register
              </Button>
            </Center>
          </Card.Body>
          <Card.Footer>
            <p className="text-capitalize text-center m-0">
              already have an account?
              <span
                className="text-capitalize mx-1 text-primary text-decoration-underline"
                onClick={navigateHandler}
              >
                login
              </span>
            </p>
          </Card.Footer>
        </Card>
      </Form>
    </>
  );
};

export default RegisterForm;
