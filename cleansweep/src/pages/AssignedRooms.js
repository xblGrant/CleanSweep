import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {CreateFloorOptions, CreateRoomOptions} from "../components/Generators";
import {firebase} from "../firebase";

class AssignedRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                if (room.val().status === "Dirty")
                    roomList.push(room.key + ", Cleaner - " + room.val().assignedEmployee);
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
                if (room.val().status === "Dirty")
                    roomList.push(room.key + ", Cleaner - " + room.val().assignedEmployee);
            })
        }).then( () =>
            this.setState({
                rooms: roomList
            })
        )
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
                    </Form>
                </div>
            </div>
        );
    }
}

export default AssignedRooms;