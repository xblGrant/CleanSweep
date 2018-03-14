import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
import {CreateFloorOptions, CreateRoomOptions} from "../components/Generators";
import {firebase} from "../firebase";

class AddWakeUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleAssignRooms = this.handleAssignRooms.bind(this);
    }

    componentDidMount() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/100");
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                roomList.push(room.key);
            })
        }).then( () =>
            this.setState({
                rooms: roomList
            })
        )
    }

    handleFloorSelect(e) {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/" + e.target.value);
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                roomList.push(room.key);
            })
        }).then( () =>
            this.setState({
                rooms: roomList
            })
        )
    }

    handleAssignRooms() {
        //TODO: handle assigning rooms to employees
    }

    render() {
        return (
            <div>
                <head>
                    <title>Assign Rooms</title>
                </head>
                <div id={"assignRoomsForm"}>
                    <Form>
                        <FormGroup>
                            <Label id={"label"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" className="floorSelect" id="floorSelect">
                                <CreateFloorOptions />
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label id={"label"} for="assignableRoom">Rooms</Label>
                            <Input id={"roomOptions"} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
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