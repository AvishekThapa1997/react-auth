import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../components/auth/login/LoginForm";
import Center from "../components/shared/center/Center";
import FullViewPort from "../components/shared/viewport/FullViewPort";

const Login = () => {
  return (
    <>
      <FullViewPort>
        <Center>
          <Container>
            <Row>
              <Col md={8} lg={4} xs={12} className="mx-auto">
                <LoginForm />
              </Col>
            </Row>
          </Container>
        </Center>
      </FullViewPort>
    </>
  );
};

export default Login;
