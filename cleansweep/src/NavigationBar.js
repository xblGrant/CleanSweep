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

        let headerExpanded, headerCollapsed;
        if (this.state.isOpen){
            headerCollapsed = <Header className={"ml-auto"} handleLogout={this.props.handleLogout} isLoggedIn={this.props.isLoggedIn}/>;
            headerExpanded = null;
        } else {
            headerCollapsed = null;
            headerExpanded = <Header className={"ml-auto"} handleLogout={this.props.handleLogout} isLoggedIn={this.props.isLoggedIn}/>;
        }

        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <div className={"container"}>
                        <NavbarToggler onClick={this.toggle} />
                        <NavbarBrand href="/">CleanSweep</NavbarBrand>
                        { headerCollapsed }
                        <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <DropDContent title={"File"}
                                                  contents={["New Employee", "New Room"]}
                                                  links={["/newemployee", "newroom"]} />
                                    <DropDContent title={"Functions"}
                                                  contents={["Add Wake-Up Call", "Add Incident", "Assign Rooms", "Inspect Room", "Check-in Guest", "Check-out Guest"]}
                                                  links={["/wakeupcall","/addincident","/assignrooms","/inspectroom","/checkinguest","/checkoutguest"]} />
                                    <DropDContent title={"Lists"}
                                                  contents={["All Rooms", "Assigned Rooms", "Available Rooms", "Inspections", "Incidents", "Wake-Up Calls", "Departing Guests"]}
                                                  links={["/allrooms","/assignedrooms","/availablerooms","/inspections","/incidents","/wakeuplist","/departingcustomers"]} />
                                    <DropDContent title={"Options"}
                                                  contents={["Change Password", "Change Role"]}
                                                  links={["/changepassword", "/changerole"]}/>
                                    <NavItem>
                                        <NavLink href="/help">Help</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="https://github.com/xblGrant/CleanSweep">Github</NavLink>
                                    </NavItem>
                                    {/*<Header className={"ml-auto"} handleLogout={this.props.handleLogout} isLoggedIn={this.props.isLoggedIn}/>*/}
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