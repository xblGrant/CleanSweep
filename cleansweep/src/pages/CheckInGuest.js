import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
import { AvailableRooms } from '../components/Generators';
import {firebase} from "../firebase";
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

const radix = 10;

class CheckInGuest extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckIn = this.handleCheckIn.bind(this);
    }

    handleCheckIn() {
        //TODO: Pass in proper parameters
        //TODO: make sure First name, Last name is valid
        //TODO: if guests (on firebase) does not have current guest,


        //adds Guest to room
        var fName, lName, roomPath, roomNum;
        fName = "Bruce";
        lName = "Wayne";
        roomPath = 'Rooms/Reservable/200/201/';
        roomNum = 201;
        var updates = {};
        updates[roomPath + 'guest'] = fName + " " + lName;
        firebase.db.ref().update(updates);

        //Adds Guest to guest DB
        //TODO: properly generate the next number for guest, coming up undefined right now
        let lastGuest = null;
        let roomRef = firebase.db.ref("/Guests/");
        roomRef.orderByKey().limitToLast(1).once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                lastGuest = room.key;
            })
        }) .then( () => {
            this.setState({
                newGuestNumber: parseInt(lastGuest) + 1
            })
        });
        firebase.db.ref('Guests/' + this.newGuestNumber).set({
            firstName: fName,
            lastName: lName,
            room: roomNum
        })
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Check-In Guest</title>
                </Helmet>
                <div>
                    <Form>
                        <FormGroup row>
                            {/*<Label id={"label"} for="custFName"></Label>*/}
                            <Input type="text" className={"margin-left-35 width-30"} id={"custFName"} placeholder={"First name"}/>
                        </FormGroup>
                        <FormGroup row>
                            {/*<Label id={"label"} for="custLName"></Label>*/}
                            <Input type="text" className={"margin-left-35 width-30"} id={"custLName"} placeholder={"Last name"}/>
                        </FormGroup>
                        <FormGroup row>
                            <AvailableRooms className={"margin-left-35 width-30"} id="listItemGenerator"/>
                        </FormGroup>
                        <Button onClick={this.handleCheckIn} className={"margin-left-35"} color={"primary"}>Check-In</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"} id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CheckInGuest;