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
import * as api from '../firebase/api';

const NavigationBar = (props, { authUser }) =>
    <div>
        { authUser
            ? <IsAdmin />
            : <NavigationNonAuth />
        }
    </div>;

NavigationBar.contextTypes = {
    authUser: PropTypes.object,
};

class IsAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false
        }
    }

    componentWillMount() {
        api.getCurrentUserIsAdmin(this);
    }

    render(){
        let isAdmin = this.state.isAdmin;

        return(
            (isAdmin)
                ? <NavigationAuth/>
                : <EmployeeAuth/>
        )
    }
}

//TODO: use this for maid navigation once we are testing for
//TODO: current user isAdmin status
class EmployeeAuth extends React.Component {
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
        let headerExpanded, headerCollapsed;
        if (this.state.isOpen){
            headerCollapsed = <Header className={"ml-auto"} isAuthUser={true}/>;
            headerExpanded = null;
        } else {
            headerCollapsed = null;
            headerExpanded = <Header className={"ml-auto"} isAuthUser={true}/>;
        }

        /*
        -Maid navigation bar (all rooms, assigned rooms, ReservableRoom(only shows Clean button for when they finish cleaning),
        NonReservableRoom(only shows clean button for when they finish cleaning), Incident List, Password Change)
         */
        return (
            <div>
                <Navbar className={"background-to-top"} color="faded" light expand="md">
                    <div className={"container"}>
                        <NavbarToggler onClick={this.toggle} />
                        <NavbarBrand className={"brand"}>CleanSweep</NavbarBrand>
                        { headerCollapsed }
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <DropDContent title={"Functions"}
                                              contents={["Add Incident"]}
                                              links={[routes.ADD_INCIDENT]}
                                              /*instance={this}*//>
                                <DropDContent title={"Lists"}
                                              contents={["All Rooms", "Assigned Rooms",
                                                  "Incidents"]}
                                              links={[routes.ALL_ROOMS, routes.ASSIGNED_ROOMS,
                                                  routes.INCIDENTS]}
                                              /*instance={this}*//>
                                <DropDContent title={"Options"}
                                              contents={["Change Password"]}
                                              links={[routes.CHANGE_PW]}
                                              /*instance={this*//>
                            </Nav>
                        </Collapse>
                        { headerExpanded }
                    </div>
                </Navbar>
            </div>
        );
    }
}

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
                <Navbar className={"background-to-top"} color="faded" light expand="md">
                    <div className={"container"}>
                        <NavbarToggler onClick={this.toggle} />
                        <NavbarBrand className={"brand"}>CleanSweep</NavbarBrand>
                        { headerCollapsed }
                        <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <DropDContent title={"File"}
                                                  contents={["New Employee", "New Room"]}
                                                  links={[routes.NEW_EMPLOYEE, routes.NEW_ROOM]}
                                                  /*instance={this}*//>
                                    <DropDContent title={"Functions"}
                                                  contents={["Add Wake-Up Call", "Add Incident", "Assign Rooms",
                                                      "Inspect Room", "Check In/Out"]}
                                                  links={[routes.WAKE_UP_CALL, routes.ADD_INCIDENT, routes.ASSIGN_ROOMS,
                                                      routes.INSPECT_ROOM, routes.CHECK_IN_OUT]}
                                                  /*instance={this}*//>
                                    <DropDContent title={"Lists"}
                                                  contents={["All Rooms", "Assigned Rooms", "Available Rooms",
                                                      "Inspections", "Incidents", "Wake-Up Calls"]}
                                                  links={[routes.ALL_ROOMS, routes.ASSIGNED_ROOMS,
                                                      routes.AVAILABLE_ROOMS, routes.INSPECTIONS, routes.INCIDENTS,
                                                      routes.WAKE_UP_LIST]}
                                                  /*instance={this}*//>
                                    <DropDContent title={"Options"}
                                                  contents={["Change Password", "Change Role"]}
                                                  links={[routes.CHANGE_PW, routes.CHANGE_ROLE]}
                                                  /*instance={this}*//>
                                    <NavItem>
                                        <NavLink href={routes.HELP} onClick={this.toggle}>Help</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href={routes.GITHUB} onClick={this.toggle}>Github</NavLink>
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
                <Navbar className={"color1"} color="faded" light expand="md">
                    <div className={"container"}>
                        <NavbarToggler onClick={this.toggle} />
                        <NavbarBrand className={"brand"}>CleanSweep</NavbarBrand>
                        { headerCollapsed }
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href={routes.HELP} /*onClick={this.toggle}*/>Help</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href={routes.GITHUB} /*onClick={this.toggle}*/>Github</NavLink>
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
            </DropdownToggle>
                <DropdownMenu>
                    <DropDItem contents={props.contents} links={props.links} /*procedure={props.instance.toggle}*/ />
                </DropdownMenu>
        </UncontrolledDropdown>
    );
}

function DropDItem(props) {
    return (
        props.contents.map(
            (content,  index/*, procedure*/) => {
                let link = props.links[index];
                return(
                    <DropdownItem key={index}>
                        <NavItem>
                            <Link to={link} /*onClick={procedure}*/>{content}</Link>
                        </NavItem>
                    </DropdownItem>
                )
            })
    );
}

export default NavigationBar;