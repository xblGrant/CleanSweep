import React from 'react';
import {
    Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Input,
    ListGroup
} from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class InspectRoom extends React.Component {
    constructor(props){
        super(props);

        this.handleInspect = this.handleInspect.bind(this);
    }

    handleInspect() {

    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div id={"inspectRoomForm"}>
                <NavigationBar/>
                <Form>
                    <FormGroup row>
                        <Dropdown id={"label"} for="floorSelect" isOpen={true}>
                            <DropdownToggle caret>
                                Floor
                            </DropdownToggle>
                        </Dropdown>
                    </FormGroup>
                    <FormGroup>
                        <Label id={"label"} for="roomList"></Label>
                        <Input type="text" id="roomList" placeholder={"List of rooms on floor will show up here"} />
                        /*TODO: THIS SHOULD BE A REACT-SELECTABLE-FAST THAT POPULATES*/
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="inspectComment">Comment</Label>
                        <Input type="text" id="inspectComment" placeholder={"Enter comment here"}/>
                    </FormGroup>

                    <br/>
                    <Button onClick={this.handleCheckIn} color={"primary"} id={"submitNewEmpBtn"}>Submit</Button>
                    {' '}
                    <WrappedButton id={"checkInCancel"} link={"/"} name={"Cancel"}/>
                </Form>
            </div>
        );
    }
}

export default InspectRoom;