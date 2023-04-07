import React from 'react';
import { BsGithub } from 'react-icons/bs'
import { BiBookOpen, BiPackage } from 'react-icons/bi'
import { Col, Container, Row } from 'react-bootstrap';
import SerdeJsonPath from './SerdeJsonPath';

const Footer = () => (
  <Container className='text-center'>
    <Row className='my-3'>
      <Col className='text-muted fs-6'>
        Queries powered by Rust using the <SerdeJsonPath /> crate:
      </Col>
    </Row>
    <Row>
      <Col className='mb-4'>
        <a
          rel='noreferrer'
          href="https://github.com/hiltontj/serde_json_path"
          target='_blank'
          className='mx-1'
        ><BsGithub type='logo' color='#adb5bd' size={24} /></a>
        <a
          rel='noreferrer'
          href="https://docs.rs/serde_json_path/latest/serde_json_path/"
          target='_blank'
          className='mx-1'
        ><BiBookOpen color='#adb5bd' size={26} /></a>
        <a
          rel='noreferrer'
          href="https://crates.io/crates/serde_json_path"
          target='_blank'
          className='mx-1'
        ><BiPackage type='logo' color='#adb5bd' size={26} /></a>
      </Col>
    </Row>
  </Container>
)

export default Footer;