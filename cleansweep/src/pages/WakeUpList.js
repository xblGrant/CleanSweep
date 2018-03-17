import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { CreateRoomOptions, CreateFloorOptions } from '../components/Generators';
import {firebase} from "../firebase";

class WakeUpList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/100");
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                if (room.val().wakeupCall !== "none")
                    roomList.push(room.key + " - " + room.val().wakeupCall);
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
                if (room.val().wakeupCall !== "none")
                    roomList.push(room.key + " - " + room.val().wakeupCall);
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
                    <title>Wake-Up Call List</title>
                </head>
                <div id={"loadWakeUpList"}>
                    <Form>
                        <FormGroup>
                            <Label id={"label"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" className="floorSelect" id="floorSelect">
                                <CreateFloorOptions />
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label id={"label"} for="floorSelect">Rooms</Label>
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

export default WakeUpList;