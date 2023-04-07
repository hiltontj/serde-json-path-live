import React from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { BiInfoCircle } from 'react-icons/bi';
import { useShowInfoBanner, useToggleInfoBanner } from '../context/hooks';
import SerdeJsonPath from './SerdeJsonPath';

const SerdeJsonPathNpmLink = () => (
  <a
    href="https://www.npmjs.com/package/serde-json-path"
    target="_blank"
    rel="noreferrer"
  >
    serde-json-path
  </a>
)

const JsonPathSpecLink = () => (
  <a
    href="https://www.ietf.org/archive/id/draft-ietf-jsonpath-base-12.html"
    target="_blank"
    rel="noreferrer"
  >
    JSONPath Specification
  </a>
)

const InfoBanner = () => {
  const show = useShowInfoBanner();
  const toggle = useToggleInfoBanner();

  if (!show) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Alert variant='light' dismissible onClose={() => toggle(false)}>
          <Container>
            <Row>
              <Col>
                <h5><BiInfoCircle /> About</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>This is the sandbox environment for <SerdeJsonPath />, a Rust library used to perform JSONPath queries on arbitrary JSON data.</p>
                <p>The sandbox runs entirely in the browser by leveraging the <SerdeJsonPathNpmLink /> NPM package, which compiles the parsing and querying functionality of <SerdeJsonPath /> into Web Assembly.</p>
                <p>You can find out more about JSONPath by reading the <JsonPathSpecLink />, and more about <SerdeJsonPath /> by following the links at the bottom of the page.</p>
              </Col>
            </Row>
          </Container>
        </Alert>
      </Col>
    </Row>
  );
}

export default InfoBanner;
