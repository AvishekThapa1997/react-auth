import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import RegisterForm from "../components/auth/register/RegisterForm";
import Center from "../components/shared/center/Center";
import FullViewPort from "../components/shared/viewport/FullViewPort";

const Register: React.FC = () => {
  return (
    <>
      <FullViewPort>
        <Center>
          <Container>
            <Row>
              <Col md={8} lg={4} xs={12} className="mx-auto">
                <RegisterForm />
              </Col>
            </Row>
          </Container>
        </Center>
      </FullViewPort>
    </>
  );
};

export default Register;
