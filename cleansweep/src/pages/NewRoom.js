import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
import { CreateFloorOptions } from "../components/Generators";
import * as routes from "../constants/routes";
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

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
        this.handleNonReservableRoom = this.handleNonReservableRoom.bind(this);
    }

    componentDidMount() {
        api.newRoom(this);
    }

    onChange(event) {
        // create new floor display 301 if new floor is 3rd lvl
    }

    handleFloorSelect(e) {
        api.newRoomFloorSelect(this, e.target.value);
    }

    handleNewRoom() {
        // TODO: handle isReservable and pass in generated room value
        // if (isReservable){
        // this.handleReservableRoom(this.state.floorNum, this.state.newRoomNumber);
        // }
        // else{
        //     this.handleNonReservableRoom(this.state.floorNum, this.state.newRoomNumber);
        // }

        // const updates = {};
        // updates['/lobby'] = {num: 'lobbyOne'};
        // firebase.db.ref('Rooms/NonReservable').update(updates);
    }

    handleReservableRoom(floor, num){
        //TODO: handle proper floor here
        // firebase.db.ref('Rooms/Reservable/' + floor + '/' + num).set({
        //     assignedEmployee: "none",
        //     guest: "none",
        //     incident: false,
        //     isReservable: true,
        //     status: "Clean",
        //     wakeupCall: "none"
        // });
    }

    handleNonReservableRoom(floor, num){
        // firebase.db.ref('Rooms/NonReservable/' + floor + '/' + num).set({
        //     assignedEmployee: "none",
        //     incident: false,
        //     status: "Clean"
        // });
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
                            <Input type="text" className={"margin-left-35 width-30"} id="roomNum" value={this.state.newRoomNumber} readOnly/>
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
                        <WrappedButton className={"margin-left-35"} link={routes.HOME} name={"Cancel"} id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewRoom;