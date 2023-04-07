import React from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { BiRefresh } from 'react-icons/bi';
import { useJsonData, useOutputUpdater, useParser, useQuery, useUpdateQuery } from '../context/hooks'
import { getQueryExample } from '../helpers';

const QueryInput = () => {
  const query = useQuery();
  const updateQuery = useUpdateQuery();
  const json = useJsonData();
  const parser = useParser();
  const updateOutput = useOutputUpdater();

  const handleRunQuery = React.useCallback(() => {
    try {
      const parsedJson = JSON.parse(json);
      const output = parser(parsedJson, query);
      updateOutput(output);
    } catch(e) {
      console.error('error parsing and querying JSON', e);
    }   
  }, [json, query, parser, updateOutput]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <InputGroup>
            <Form.Control
              placeholder='Enter a JSONPath query...'
              value={query}
              onChange={e => updateQuery(e.target.value)}
            />
            <Button onClick={handleRunQuery}>Run Query</Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default QueryInput