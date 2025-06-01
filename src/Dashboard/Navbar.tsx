import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import store from "../state/RootReducer";
import { useDispatch } from "react-redux";
import { AuthActions } from "../state/Authentication/Action";

const NavigationBar = (props: any) => {
  const {
    activeMenu,
    setActiveMenu,
  }: {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
  } = props;
  const dispatch = useDispatch();

  return (
    <Navbar expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Brand>Countries</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              active={activeMenu === "All"}
              onClick={() => setActiveMenu("All")}
            >
              All
            </Nav.Link>
            <Nav.Link
              active={activeMenu === "Asia"}
              onClick={() => setActiveMenu("Asia")}
            >
              Asia
            </Nav.Link>
            <Nav.Link
              active={activeMenu === "Europe"}
              onClick={() => setActiveMenu("Europe")}
            >
              Europe
            </Nav.Link>
            <Nav.Link onClick={() => dispatch(AuthActions.doSignOut(null))}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
