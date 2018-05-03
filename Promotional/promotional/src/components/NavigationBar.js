import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    } from 'reactstrap';
import logo from "../pages/darkerlogo.png";
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
                <Navbar className={"background-to-top"} color="faded" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <NavbarBrand href="/"><img className={"center col-sm-6"} src = {logo}
                                               alt = "CleanSweep"/></NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/tryit">Try It!</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/doc">Documentation</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/aboutus">About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/help">Contact Us</NavLink>
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