import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiError } from "react-icons/bi";
import {
    useIsLocated,
  useJsonData,
  useOutputUpdater,
  useQuery,
  useSetError,
  useShowError,
  useToggleError,
  useUpdateQuery,
} from "../context/hooks";

const QueryInput = () => {
  const query = useQuery();
  const updateQuery = useUpdateQuery();
  const json = useJsonData();
  const updateOutput = useOutputUpdater();
  const showError = useShowError();
  const setError = useSetError();
  const toggleError = useToggleError();
  const isLocated = useIsLocated();

  const handleQueryUpdate = React.useCallback(
    (query: string) => {
      toggleError(false);
      updateQuery(query);
    },
    [toggleError, updateQuery]
  );

  const handleRunQuery = React.useCallback(() => {
    import("serde-json-path")
      .then(({ JsonPath }) => {
        const parsedJson = JSON.parse(json);
        const path = JsonPath.parse(query);
        const output = isLocated ? path.query_located(parsedJson) : path.query(parsedJson);
        updateOutput(output);
      })
      .catch((e) => {
        const message = `Error: ${e as string}`;
        setError(message);
      });
  }, [json, query, updateOutput, setError, isLocated]);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm className="my-2">
          <Form.Control
            placeholder="Enter a JSONPath query..."
            value={query}
            onChange={(e) => handleQueryUpdate(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={3} lg={2} className="my-2">
          {!showError ? (
            <Button className="w-100" onClick={handleRunQuery}>
              Run Query
            </Button>
          ) : (
            <Button className="w-100" variant="danger">
              <BiError size={18} /> Error
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default QueryInput;
