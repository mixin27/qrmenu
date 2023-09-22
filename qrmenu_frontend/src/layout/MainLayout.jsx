import PropTypes from "prop-types";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const { token, logout } = useAuth();

  const onSignIn = () => {
    navigate("/login");
  };

  const onRegister = () => {
    navigate("/register");
  };

  const onSignOut = () => {
    logout();
  };

  const goToPlaces = () => {
    navigate("/places");
  };

  return (
    <>
      <Navbar bg="light" variant="light" className="mb-4 px-4">
        <Navbar.Brand href="/">QR Menu</Navbar.Brand>

        <Nav>
          <Nav.Link onClick={goToPlaces}>Places</Nav.Link>
        </Nav>

        <Nav className="flex-grow-1 justify-content-end">
          {!token ? (
            <>
              <Nav.Link key={1} onClick={onSignIn}>
                Login
              </Nav.Link>
              <Nav.Link key={2} onClick={onRegister}>
                Register
              </Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={onSignOut}>Logout</Nav.Link>
          )}
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
