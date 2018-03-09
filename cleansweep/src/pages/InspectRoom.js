import React from 'react';
import { WrappedButton } from "../components/Buttons";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

class InspectRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };

        this.handleInspect = this.handleInspect.bind(this);
        this.toggle = this.toggle.bind(this);
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
            <div>
                <head>
                    <title>Inspect Room</title>
                </head>
                <div id={"inspectRoomForm"}>
                    <Form>
                        <FormGroup>
                            <Label id={"label"} for="floorSelect">Floor</Label>
                            <Input type="select" className="floorSelect" id="floorSelect" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            {/*<Label id={"label"} for="roomList"></Label>*/}
                            <Input type="textarea" id="roomList"
                                   placeholder={"List of rooms on floor will show up here"}/>
                            {/*TODO: THIS SHOULD BE A REACT-SELECTABLE-FAST THAT POPULATES OR REACTSTRAP ListGroup*/}
                        </FormGroup>
                        <FormGroup row>
                            <Label id={"label"} for="inspectComment">Comment</Label>
                            <Input type="textarea" id="inspectComment" placeholder={"Enter comment here"}/>
                        </FormGroup>
                        <Button onClick={this.handleCheckIn} color={"primary"} id={"submitNewEmpBtn"}>Submit</Button>
                        {' '}
                        <WrappedButton id={"checkInCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default InspectRoom;