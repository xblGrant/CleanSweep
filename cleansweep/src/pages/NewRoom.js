import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
import { CreateFloorOptions } from "../components/Generators";
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

import { firebase } from '../firebase/index';

const radix = 10;

class NewRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRoomNumber: null
        };

        this.onChange = this.onChange.bind(this);
        this.handleNewRoom = this.handleNewRoom.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleReservableRoom = this.handleReservableRoom.bind(this);
    }

    componentDidMount() {
        let lastRoom = null;
        let roomRef = firebase.db.ref("/Rooms/Reservable/100");
        roomRef.orderByKey().limitToLast(1).once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                lastRoom = room.key;
            })
        }).then( () => {
            this.setState({
                newRoomNumber: parseInt(lastRoom, radix) + 1
            })
        });
    }

    onChange() {
        // create new floor display 301 if new floor is 3rd lvl
    }

    handleFloorSelect(e) {
        let lastRoom = null;
        // Rooms/Reservable is a path in the database
        // e.target.value is the associated floor the user clicks on
        // when calling firebase.db.ref, the whole string will get all the rooms on a given floor
        let floorRef = firebase.db.ref("/Rooms/Reservable/" + e.target.value);

        // orderByKey orders rooms on the floor alphabetically
        // to avoid issues with asynchronous access to the database, need to use once().then() together
        // .once() returns a promise which .then() waits for to execute, otherwise newRoomNumber would be set to null because of how asynchronous accessing works
        // snapshot refers to the floor, childSnapshot refers to each room on the floor
        // calling val() is necessary to get values out of the objects, room is the item that stores the room #
        // once the asynchronous access to the database has returned a value, the then() part of the code is called
        floorRef.orderByKey().once('value', function(snapshot) {
            snapshot.forEach( function(childSnapshot) {
                lastRoom = childSnapshot.key;
            })
        }).then( () => {
            this.setState({
                newRoomNumber: parseInt(lastRoom, radix) + 1
            })
        });
    }

    handleNewRoom() {
        // TODO: handle isReservable and pass in generated room value
        // if (isReservable){
        this.handleReservableRoom(105);
        // }
        // else{
        //     handleNonReservableRoom()
        // }

        // const updates = {};
        // updates['/lobby'] = {num: 'lobbyOne'};
        // firebase.db.ref('Rooms/NonReservable').update(updates);
    }

    handleReservableRoom(num){
        //TODO: handle proper floor here
        firebase.db.ref('Rooms/Reservable/100/' + num).set({
            assignedEmployee: "none",
            guest: "none",
            incident: false,
            isReservable: true,
            status: "Clean",
            wakeupCall: "none"
        });
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>New Room</title>
                </Helmet>
                <div id={"newRoomForm"}>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type={"select"} className="margin-left-35 width-30">
                                <CreateFloorOptions />
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="roomNum">
                                New Room
                            </Label>
                            <Input type="text" className={"margin-left-35 width-30"}id="roomNum" value={this.state.newRoomNumber} readOnly/>
                        </FormGroup>
                        <FormGroup check>
                            <Label className={"margin-left-35"} check>
                                <Input type={"checkbox"} onChange={this.onChange} id={"newFloor"}/>{' '}
                                New Floor
                            </Label>
                            <br/>
                            <Label className={"margin-left-35"} check>
                                <Input type={"checkbox"} id={"isReservable"}/>{' '}
                                Reservable
                            </Label>
                        </FormGroup>
                        <br/>
                        <Button onClick={this.handleNewRoom} color={"primary"} className={"margin-left-35"}>Submit</Button>
                        {' '}
                        <WrappedButton className={"margin-left-35"} link={routes.HOME} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewRoom;