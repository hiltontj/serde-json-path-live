import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BiInfoCircle } from 'react-icons/bi';
import { useToggleInfoBanner } from '../context/hooks';

const Header = () => {
  const toggleAbout = useToggleInfoBanner();
  
  return (
    <Container className='my-3'>
      <Row>
        <Col md={{span: 6, offset: 3}}><h1 className='clr-orange'>$.erde.json.path</h1></Col>
        <Col className="d-flex align-items-center justify-content-end">
          <Button
            onClick={() => toggleAbout(true)}
            variant='outline-secondary'
            size='sm'
          >
            <BiInfoCircle size={18} /> About
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;