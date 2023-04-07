import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useOutput } from "../context/hooks";
import AceEditor from "react-ace";

const convert = (res: any): any => {
  let conv = [];
  for (const r of res) {
    if (r instanceof Map) {
      conv.push(Object.fromEntries(r));
    } else if (r instanceof Array) {
      conv.push(convert(r));
    } else {
      conv.push(r);
    }
  }
  return conv;
};

const QueryOutput = () => {
  const output = useOutput();
  console.debug("output", output);
  const formattedOutput = React.useMemo(() => {
    return JSON.stringify(convert(output), null, 2);
  }, [output]);

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Row className="header">
        <Col className="text-center">Query Output</Col>
      </Row>
      <Row className="body">
        <Col>
          <AceEditor
            mode="json"
            name="query-output"
            theme="one_dark"
            fontSize={16}
            tabSize={2}
            width="100%"
            height="100%"
            showPrintMargin={false}
            value={formattedOutput}
            readOnly
          />
        </Col>
      </Row>
    </Container>
  );
};

export default QueryOutput;
