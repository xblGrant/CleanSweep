import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import NavigationBar from "../components/NavigationBar";
import WrappedButton from "../components/WrappedButton";

import { firebase } from '../firebase/index';

class NewRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRoomNumber: null
        };

        this.handleNewRoom = this.handleNewRoom.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    handleFloorSelect(e) {
        let lastRoom = null;
        let floorRef = firebase.db.ref("/Rooms/Reservable/" + e.target.value);

        floorRef.orderByKey().once('value', function(snapshot) {
            snapshot.forEach( function(childSnapshot) {
                lastRoom = childSnapshot.val().room;
            })
        }).then( () => {
            this.setState({
                newRoomNumber: lastRoom + 1
            })
        });
    }

    handleNewRoom() {
        // TODO: handle addition of new room


        // const updates = {};
        // updates['/lobby'] = {num: 'lobbyOne'};
        // firebase.db.ref('Rooms/NonReservable').update(updates);
    }

    render() {
        return (
            <div>
                <head>
                    <title>New Room</title>
                </head>
                <div id={"newRoomForm"}>
                    <NavigationBar/>
                    <Form>
                        <FormGroup>
                            <Label id={"label"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type={"select"} className="floorSelect" id="floorSelect">
                                <option value={"100"}>1</option>
                                <option value={"200"}>2</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label id={"label"} for="roomNum">
                                New Room
                            </Label>
                            <Input type="text" id="roomNum" value={this.state.newRoomNumber} readOnly/>
                        </FormGroup>
                        <FormGroup check>
                            <Label id={"label"} check>
                                <Input type="checkbox" id="isReservable"/>{' '}
                                Reservable
                            </Label>
                        </FormGroup>
                        <br/>
                        <Button onClick={this.handleNewRoom} color={"primary"} id={"submitNewRoomBtn"}>Submit</Button>
                        {' '}
                        <WrappedButton id={"newRoomCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewRoom;