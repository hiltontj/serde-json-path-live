import { Button, Col, Container, Row } from "react-bootstrap";
import { BiInfoCircle } from "react-icons/bi";
import { useToggleInfoBanner } from "../context/hooks";

const Header = () => {
  const toggleAbout = useToggleInfoBanner();

  return (
    <Container fluid className="my-3">
      <Row>
        <Col xs={9} sm={{ span: 6, offset: 3 }}>
          <h1 className="clr-orange">JSONPath Sandbox</h1>
        </Col>
        <Col xs={3} className="d-flex align-items-center justify-content-end">
          <Button
            onClick={() => toggleAbout(true)}
            variant="outline-secondary"
            size="sm"
          >
            <BiInfoCircle size={18} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
