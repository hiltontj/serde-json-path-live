import React from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { BiError } from 'react-icons/bi';
import { useJsonData, useOutputUpdater, useParser, useQuery, useSetError, useShowError, useToggleError, useUpdateQuery } from '../context/hooks'

const QueryInput = () => {
  const query = useQuery();
  const updateQuery = useUpdateQuery();
  const json = useJsonData();
  const parser = useParser();
  const updateOutput = useOutputUpdater();
  const showError = useShowError();
  const setError = useSetError();
  const toggleError = useToggleError();

  const handleQueryUpdate = React.useCallback((query: string) => {
    toggleError(false);
    updateQuery(query);
  }, [toggleError, updateQuery])

  const handleRunQuery = React.useCallback(() => {
    try {
      const parsedJson = JSON.parse(json);
      const output = parser(parsedJson, query);
      updateOutput(output);
    } catch(e) {
      const message = `Error: ${e as string}`;
      setError(message);
    }
  }, [json, query, parser, updateOutput, setError]);

  return (
    <Container>
      <Row>
        <Col>
          <InputGroup>
            <Form.Control
              placeholder='Enter a JSONPath query...'
              value={query}
              onChange={e => handleQueryUpdate(e.target.value)}
            />
            {!showError ? (
              <Button onClick={handleRunQuery}>Run Query</Button>
            ) : (
              <Button variant='danger'><BiError size={18} /> Error</Button> 
            )}
          </InputGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default QueryInput