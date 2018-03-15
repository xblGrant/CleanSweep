import React from 'react';
import PropTypes from 'prop-types';
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
import * as routes from '../constants/routes';


const NavigationBar = (props, { authUser }) =>
    <div>
        { authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>;

NavigationBar.contextTypes = {
    authUser: PropTypes.object,
};

class NavigationAuth extends React.Component {
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

        let headerExpanded, headerCollapsed;
        if (this.state.isOpen){
            headerCollapsed = <Header className={"ml-auto"} isAuthUser={true}/>;
            headerExpanded = null;
        } else {
            headerCollapsed = null;
            headerExpanded = <Header className={"ml-auto"} isAuthUser={true}/>;
        }

        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <div className={"container"}>
                        <NavbarToggler onClick={this.toggle} />
                        <NavbarBrand href={routes.ASSIGNED_ROOMS}>CleanSweep</NavbarBrand>
                        { headerCollapsed }
                        <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <DropDContent title={"File"}
                                                  contents={["New Employee", "New Room"]}
                                                  links={[routes.NEW_EMPLOYEE, routes.NEW_ROOM]} />
                                    <DropDContent title={"Functions"}
                                                  contents={["Add Wake-Up Call", "Add Incident", "Assign Rooms", "Inspect Room", "Check-in Guest", "Check-out Guest"]}
                                                  links={[routes.WAKE_UP_CALL,routes.ADD_INCIDENT,routes.ASSIGN_ROOMS,routes.INSPECT_ROOM,routes.CHECK_IN_GUEST,routes.CHECK_OUT_GUEST]} />
                                    <DropDContent title={"Lists"}
                                                  contents={["All Rooms", "Assigned Rooms", "Available Rooms", "Inspections", "Incidents", "Wake-Up Calls", "Departing Guests"]}
                                                  links={[routes.ALL_ROOMS,routes.ASSIGNED_ROOMS,routes.AVAILABLE_ROOMS,routes.INSPECTIONS,routes.INCIDENTS,routes.WAKE_UP_LIST,routes.DEPARTING_GUESTS]} />
                                    <DropDContent title={"Options"}
                                                  contents={["Change Password", "Change Role"]}
                                                  links={[routes.CHANGE_PW, routes.CHANGE_ROLE]}/>
                                    <NavItem>
                                        <NavLink href={routes.HELP}>Help</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href={routes.GITHUB}>Github</NavLink>
                                    </NavItem>
                                </Nav>
                        </Collapse>
                        { headerExpanded }
                    </div>
                </Navbar>
            </div>
        );
    }
}

class NavigationNonAuth extends React.Component {
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

        let headerExpanded, headerCollapsed;
        if (this.state.isOpen){
            headerCollapsed = <Header className={"ml-auto"} />;
            headerExpanded = null;
        } else {
            headerCollapsed = null;
            headerExpanded = <Header className={"ml-auto"} />;
        }

        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <div className={"container"}>
                        <NavbarToggler onClick={this.toggle} />
                        <NavbarBrand href={routes.LANDING}>CleanSweep</NavbarBrand>
                        { headerCollapsed }
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href={routes.HELP}>Help</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href={routes.GITHUB}>Github</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        { headerExpanded }
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