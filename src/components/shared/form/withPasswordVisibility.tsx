import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const withPasswordVisibility = <T,>(
  InputControlPassword: React.FC<T>
): React.FC<T & { error: string | null }> => {
  return ({ error, ...props }) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const passwordVisibilityHandler = (event: React.MouseEvent) => {
      setPasswordVisibility((prevState) => !prevState);
    };
    return (
      <InputGroup className="mb-4" size="sm">
        <InputGroup.Text>
          <FaLock />
        </InputGroup.Text>
        <InputControlPassword
          {...(props as T)}
          type={passwordVisibility ? "text" : "password"}
        />
        <InputGroup.Text onClick={passwordVisibilityHandler}>
          {!passwordVisibility ? <FaEye /> : <FaEyeSlash />}
        </InputGroup.Text>
        {error ? (
          <Form.Control.Feedback type="invalid" className="fw-bold">
            {error}
          </Form.Control.Feedback>
        ) : null}
      </InputGroup>
    );
  };
};

export default withPasswordVisibility;
