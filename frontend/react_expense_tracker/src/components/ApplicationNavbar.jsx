import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function ApplicationNavbar() {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Expense Track Application</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/categories">Categories</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/expenses">Expenses</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default ApplicationNavbar;
