import { Col, Container, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col mx={12} md={8} lg={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
