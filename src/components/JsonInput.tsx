import React from "react";
import AceEditor from "react-ace";
import { Col, Container, Row } from "react-bootstrap";
import { useJsonData, useJsonDataUpdater } from "../context/hooks";

const JsonInput = () => {
  const json = useJsonData();
  const updateJson = useJsonDataUpdater();

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      fluid
    >
      <Row className="header">
        <Col className="text-center">JSON Input</Col>
      </Row>
      <Row className="body">
        <Col>
          <AceEditor
            mode="json"
            name="json-input"
            theme="one_dark"
            fontSize={16}
            tabSize={2}
            width="100%"
            height="100%"
            showPrintMargin={false}
            value={json}
            onChange={(val, evt) => updateJson(val)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default JsonInput;
