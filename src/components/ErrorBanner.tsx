import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useError, useShowError, useToggleError } from "../context/hooks";

const ErrorBanner = () => {
  const error = useError();
  const showError = useShowError();
  const toggleError = useToggleError();

  if (!showError) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Alert variant="danger" dismissible onClose={() => toggleError(false)}>
          <Container fluid>
            <Row>
              <Col>{error}</Col>
            </Row>
          </Container>
        </Alert>
      </Col>
    </Row>
  );
};

export default ErrorBanner;
