import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token, login, loading } = useAuth();
  console.log(loading);

  useEffect(() => {
    if (token) {
      navigate("/places");
    }
  }, [token, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    login(username, password);
  };

  return (
    <MainLayout>
      <Row className="justify-content-center">
        <Col lg={6} md={8}>
          <Card>
            <Card.Body>
              <h3 className="text-center">
                <b>LOGIN</b>
              </h3>

              <Form.Group className="my-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="my-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2 my-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" role="status" variant="light">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Login;
