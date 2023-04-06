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
    (async () => {
      try {
        console.debug('query', json, query);
        const parsedJson = JSON.parse(json);
        const output = await parser(parsedJson, query);
        updateOutput(output);
      } catch(e) {
        console.error('error parsing and querying JSON', e);
      }   
    })()
  }, [json, query, parser, updateOutput]);

  const handleRandomize = React.useCallback(() => {
    updateQuery(getQueryExample());
  }, [updateQuery]);
  
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
            <Button onClick={handleRandomize} variant='outline-secondary'><BiRefresh size={24} /></Button>
            <Button onClick={handleRunQuery}>Run Query</Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default QueryInput