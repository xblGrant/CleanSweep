import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
import { CreateRoomOptions, CreateFloorOptions } from '../components/Generators';
import {firebase} from "../firebase";

class AddWakeUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleNewWakeUp = this.handleNewWakeUp.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/100");
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                if (room.val().guest !== "none")
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
                if (room.val().guest !== "none")
                    roomList.push(room.key);
            })
        }).then( () =>
            this.setState({
                rooms: roomList
            })
        )
    }

    handleNewWakeUp() {
        //TODO: submit new wake up call
    }

    render() {
        return (
            <div>
                <head>
                    <title>Add Wake-Up Call</title>
                </head>
                <div id={"newWakeUpForm"}>
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
                        <FormGroup row>
                            <Label id={"label"} for="wakeUpDate">Date</Label>
                            <Input type="date" id="wakeUpDate" placeholder={"Email"}/>
                        </FormGroup>
                        <FormGroup row>
                            <Label id={"label"} for="wakeUpTime">Time</Label>
                            <Input type="time" id="wakeUpTime" placeholder={"Password"}/>
                        </FormGroup>
                        <Button onClick={this.handleNewWakeUp} color={"primary"}
                                id={"submitNewWakeUpBtn"}>Submit</Button>
                        {' '}
                        <WrappedButton id={"newWakeUpCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddWakeUp;