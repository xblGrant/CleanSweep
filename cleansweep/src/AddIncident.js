import React from 'react';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";
import {
    Button,
    DropdownToggle,
    Form,
    FormGroup,
    Label,
    Input,
    ButtonDropdown,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class AddIncident extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };

        this.handleIncident = this.handleIncident.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleIncident() {

    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div id={"incidentRoomForm"}>
                <NavigationBar/>
                <Form>
                    <FormGroup>
                        <ButtonDropdown id={"floorSelect"} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Floor
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>1</DropdownItem>
                                <DropdownItem>2</DropdownItem>
                                <DropdownItem>3</DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem>etc...</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </FormGroup>
                    <FormGroup>
                        {/*<Label id={"label"} for="roomList"></Label>*/}
                        <Input type="textarea" id="roomList" placeholder={"List of rooms on floor will show up here"}/>
                        {/*TODO: THIS SHOULD BE A REACT-SELECTABLE-FAST THAT POPULATES OR REACTSTRAP ListGroup*/}
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="incidentComment">Comment</Label>
                        <Input type="textarea" id="incidentComment" placeholder={"Enter comment here"}/>
                    </FormGroup>
                    <Button onClick={this.handleCheckIn} color={"primary"} id={"submitNewEmpBtn"}>Submit</Button>
                    {' '}
                    <WrappedButton id={"checkInCancel"} link={"/"} name={"Cancel"}/>
                </Form>
            </div>
        );
    }
}

export default AddIncident;