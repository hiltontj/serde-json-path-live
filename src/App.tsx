import React from 'react';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import QueryInput from './components/QueryInput';
import Footer from './components/Footer';
import { SerdeJsonPathProvider } from './context';
import JsonInput from './components/JsonInput';
import QueryOutput from './components/QueryOutput';
import InfoBanner from './components/InfoBanner';
import ErrorBanner from './components/ErrorBanner';

function App() {
  return (
    <SerdeJsonPathProvider>
      <Container className='main'>
        <Row className='header text-center'>
          <Col><Header /></Col>
        </Row>
        <InfoBanner />
        <Row className='header mb-3'>
          <Col><QueryInput /></Col>
        </Row>
        <ErrorBanner />
        <Row className='body'>
          <Col><JsonInput /></Col>
          <Col><QueryOutput /></Col>
        </Row>
        <Row className='footer'>
          <Col><Footer /></Col>
        </Row>
      </Container>
    </SerdeJsonPathProvider>
  );
}

export default App;
