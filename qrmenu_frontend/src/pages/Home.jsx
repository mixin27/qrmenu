import { Button, Container, Row, Col, Image } from "react-bootstrap";

import MainLayout from "../layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div className="p-5 mb-4 bg-light rounded-3">
        <Container fluid className="py-5">
          <Row>
            <Col md={6} className="my-auto">
              <h1 className="display-5 fw-bold">QR Code Menu</h1>
              <p className="mt-4 mb-4 fs-4">
                A smart way to share your digital menu in a QR code with your
                customers
              </p>
              <br />
              <Button
                href="/places"
                variant="primary"
                size="lg"
                className="my-4"
              >
                Create Your Menu
              </Button>
            </Col>
            <Col md={6}>
              <Image
                src="https://assets.materialup.com/uploads/ae60e834-349c-4c94-8189-2450f09ad37a/preview.gif"
                rounded
                fluid
              />
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Home;
