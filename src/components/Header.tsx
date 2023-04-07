import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BiInfoCircle } from "react-icons/bi";
import { useShowInfoBanner, useToggleInfoBanner } from "../context/hooks";

const Header = () => {
  const showAbout = !useShowInfoBanner();
  const toggleAbout = useToggleInfoBanner();

  return (
    <Container className="my-3">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="clr-orange">$.erde.json.path</h1>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <Button
            onClick={() => toggleAbout(true)}
            variant="outline-secondary"
            size="sm"
            disabled={!showAbout}
          >
            <BiInfoCircle size={18} />
            {showAbout && " About"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
