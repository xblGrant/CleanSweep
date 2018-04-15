import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {

        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <NavbarBrand href="/home">CleanSweep</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#">Try It!</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/doc">Documentation</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/aboutus">About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/help">Help</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/xblGrant/CleanSweep">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;