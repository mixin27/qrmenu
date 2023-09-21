import PropTypes from "prop-types";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const onSignIn = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" variant="light" className="mb-4">
        <Navbar.Brand href="/">QR Menu</Navbar.Brand>

        <Nav className="flex-grow-1 justify-content-end">
          <Nav.Link onClick={onSignIn}>Login</Nav.Link>
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
