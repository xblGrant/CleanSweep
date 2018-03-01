import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class AddWakeUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleAssignRooms = this.handleAssignRooms.bind(this);
    }

    handleAssignRooms() {
        //TODO: submit new wake up call
    }

    render() {
        return (
            <div>
                <head>
                    <title>Assign Rooms</title>
                </head>
                <div id={"assignRoomsForm"}>
                    <NavigationBar/>
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
                        <FormGroup row>
                            <Label id={"label"} for="assignableRoom">Room</Label>
                            <Input
                                placeholder={"Auto-populate with occupied rooms on given floor/react-selectable-fast"}
                                type="textarea" id="assignableRooms"/>
                        </FormGroup>
                        <FormGroup row>
                            <Label id={"label"} for="assignEmployees">Employees</Label>
                            <Input
                                placeholder={"Auto-populate with employees/react-selectable-fast"}
                                type="textarea" id="assignEmployees" />
                        </FormGroup>
                        <Button onClick={this.handleAssignRooms} color={"primary"}
                                id={"submitAssignRoomsBtn"}>Submit</Button>
                        {' '}
                        <WrappedButton id={"newWakeUpCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddWakeUp;