import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useOutput } from '../context/hooks';
import AceEditor from 'react-ace';

const QueryOutput = () => {
  const output = useOutput();
  const formattedOutput = React.useMemo(() => JSON.stringify(output, null, 2), [output]);

  return (
    <Container style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <Row className='header'>
        <Col className="text-center">Query Output</Col>
      </Row>
      <Row className='body'>
        <Col>
          <AceEditor
            mode='json'
            name='query-output'
            theme='one_dark'
            fontSize={16}
            tabSize={2}
            width='100%'
            height='100%'
            value={formattedOutput}
            onChange={() => {}}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default QueryOutput;
