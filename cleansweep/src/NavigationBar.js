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
import Header from './Header';
import { Link } from 'react-router-dom';
import CheckInGuest from "./CheckInGuest";
import InspectRoom from "./InspectRoom";

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
        // TODO: discern if anyone is logged in and render appropriate NavigationBar
        // TODO: discern if manager or employee is logged in then render appropriate NavigationBar
        // TODO: create employee NavigationBar

        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <div className={"container"}>
                        <NavbarToggler onClick={this.toggle} />
                        <NavbarBrand href="/">CleanSweep</NavbarBrand>
                        <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <DropDContent title={"File"} contents={["New Employee", "New Room"]} links={["/NewEmployee", "NewRoom"]} />
                                    <DropDContent title={"Functions"} contents={["Add Wake-Up Call", "Add Incident", "Assign Rooms", "Inspect Room", "Check-in Guest", "Check-out Guest"]} links={["#","#","#","InspectRoom","CheckInGuest","#"]} />
                                    <DropDContent title={"Lists"} contents={["Assigned Rooms", "Available Rooms", "Inspections", "Incidents", "Wake-Up Calls", "Departing Guests"]} links={["#","#","#","#","#","#"]} />
                                    <DropDContent title={"Options"} contents={["Option1", "Option2"]} links={["#", "#"]}/>
                                    <NavItem>
                                        <NavLink href="#">Help</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="https://github.com/xblGrant/CleanSweep">Github</NavLink>
                                    </NavItem>
                                </Nav>
                        </Collapse>
                        <Header handleLogout={this.props.handleLogout} toLoginPage={this.props.toLoginPage} isLoggedIn={this.props.isLoggedIn}/>
                    </div>
                </Navbar>
            </div>
        );
    }
}

function DropDContent(props) {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
                {props.title}
                <DropdownMenu >
                    <DropDItem  contents={props.contents} links={props.links}/>
                </DropdownMenu>
            </DropdownToggle>
        </UncontrolledDropdown>
    );
}

function DropDItem(props) {
    return (
        props.contents.map(
            (content,  index) => {
                let link = props.links[index];
                return(
                    <DropdownItem>
                        <NavItem>
                            <Link to={link}>{content}</Link>
                        </NavItem>
                    </DropdownItem>
                )
            })
    );
}

export default NavigationBar;