import { useState, useCallback, useMemo } from "react";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import { FaEnvelope, FaEye, FaLock, FaEyeSlash } from "react-icons/fa";
import CONSTANTS from "../../../constants/constants";
import useDebounce from "../../../hooks/useDebounce";
import { isValidEmail, isValidPassword } from "../../../util/validation";
import Center from "../../shared/center/Center";
import FormInput from "../../shared/form/FormInput";
import { Link } from "react-router-dom";
import IAuthBaseState from "../IAuthBaseState";
import withPasswordVisibility from "../../shared/form/withPasswordVisibility";

const defaultLoginFormState: IAuthBaseState = {
  email: {
    value: "",
    isFocus: false,
    error: null,
    isValid: false,
  },
  password: {
    value: "",
    isFocus: false,
    error: null,
    isValid: false,
  },
};
const LoginForm: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginFormState, setLoginFormState] = useState(defaultLoginFormState);
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      email: loginFormState.email.value,
      password: loginFormState.password.value,
    });
  };
  const emailInputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const email = event.target.value;
      const isValid = isValidEmail(email);
      setLoginFormState((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          value: email,
          isValid,
          error: !isValid ? CONSTANTS.ERRORS.INVALID_EMAIL : null,
        },
      }));
    },
    [setLoginFormState]
  );
  const passwordInputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const password = event.target.value;
      const isValid = isValidPassword(password);
      setLoginFormState((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          value: password,
          isValid,
          error: !isValid ? CONSTANTS.ERRORS.INVALID_PASSWORD : null,
        },
      }));
    },
    [setLoginFormState]
  );
  const debouncedEmailInputChangeHandler = useDebounce(
    emailInputChangeHandler,
    CONSTANTS.DEBOUNCE_DELAY
  );
  const debouncedPasswordInputChangeHandler = useDebounce(
    passwordInputChangeHandler,
    CONSTANTS.DEBOUNCE_DELAY
  );
  const inputFocusHandler = (event: React.FocusEvent) => {
    const inputElement = event.target as HTMLInputElement;
    const key = inputElement.dataset.key! as keyof IAuthBaseState;
    if (!loginFormState[key]) {
      return;
    }
    setLoginFormState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        isFocus: true,
      },
    }));
  };
  const inputBlurHandler = (event: React.FocusEvent) => {
    const inputElement = event.target as HTMLInputElement;
    const key = inputElement.dataset.key! as keyof IAuthBaseState;
    if (!loginFormState[key]) {
      return;
    }
    setLoginFormState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        isFocus: false,
        error: inputElement.value === "" ? null : prevState[key].error,
      },
    }));
  };
  const disableFormSubmitButton =
    !loginFormState.email.isValid || !loginFormState.password.isValid;
  const PasswordInput = useMemo(() => {
    return withPasswordVisibility(FormInput);
  }, []);
  return (
    <>
      <Form onSubmit={onSubmitHandler} noValidate className="needs-validation">
        <Card>
          <Card.Header>
            <Card.Title className="text-capitalize text-center mx-2">
              login
            </Card.Title>
          </Card.Header>
          <Card.Body className="my-3">
            <InputGroup className="mb-4" size="sm">
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <FormInput
                placeholder="Enter Email"
                size="lg"
                type="email"
                required
                onChange={debouncedEmailInputChangeHandler}
                isInvalid={!!loginFormState.email.error}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                data-key="email"
              />
              <Form.Control.Feedback type="invalid" className="fw-bold">
                {loginFormState.email.error}
              </Form.Control.Feedback>
            </InputGroup>
            <PasswordInput
              placeholder="Enter Password"
              type={passwordVisibility ? "text" : "password"}
              size="lg"
              required
              onChange={debouncedPasswordInputChangeHandler}
              onBlur={inputBlurHandler}
              onFocus={inputFocusHandler}
              isInvalid={!!loginFormState.password.error}
              data-key="password"
              error={loginFormState.password.error}
            />
            <Center>
              <Button
                variant="primary"
                type="submit"
                className="text-capitalize px-4 py-2"
                disabled={disableFormSubmitButton}
              >
                login
              </Button>
            </Center>
          </Card.Body>
          <Card.Footer>
            <p className="text-capitalize text-center m-0">
              don't have an account?
              <Link to={CONSTANTS.ROUTES.REGISTER}>
                <span className="text-capitalize mx-1 text-primary text-decoration-underline">
                  register
                </span>
              </Link>
            </p>
          </Card.Footer>
        </Card>
      </Form>
    </>
  );
};

export default LoginForm;
