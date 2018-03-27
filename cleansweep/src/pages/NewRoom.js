import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {WrappedButton} from "../components/Buttons";
import {CreateFloorOptions, NumberOfRooms} from "../components/Generators";
import * as routes from "../constants/routes";
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class NewRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRoomNumber: null,
            numNewRooms: '1',
            newFloor: '',
            newFloorRoomNum: null,
            createNewFloor: false,
        };

        this.handleNewRoom = this.handleNewRoom.bind(this);
        this.handleNumRooms = this.handleNumRooms.bind(this);
        this.handleNewFloor = this.handleNewFloor.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleReservableRoom = this.handleReservableRoom.bind(this);
        this.handleNonReservableRoom = this.handleNonReservableRoom.bind(this);
    }

    static RADIX = 10;
    static NUM_ROOMS = 10;

    componentDidMount() {
        api.generateNewRoomNumber(this);
        api.getNewFloor(this);
    }

    handleNumRooms(e) {
        let numNewRooms = e.target.value;
        this.setState({
            numNewRooms: numNewRooms
        })
    }

    handleFloorSelect(e) {
        api.newRoomFloorSelect(this, e.target.value);
    }

    handleNewFloor() {
        this.setState({
            createNewFloor: !this.state.createNewFloor
        });

        let {createNewFloor} = this.state;
        if (createNewFloor) {
            api.getNewFloor(this);
        } else {
            api.generateNewRoomNumber(this);
        }
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

    handleReservableRoom(floor, num) {
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

    handleNonReservableRoom(floor, num) {
        // firebase.db.ref('Rooms/NonReservable/' + floor + '/' + num).set({
        //     assignedEmployee: "none",
        //     incident: false,
        //     status: "Clean"
        // });
    }

    render() {

        let {
            newRoomNumber,
            numNewRooms,
            createNewFloor,
            newFloorRoomNum,
            newFloor
        } = this.state;

        let displayValue, endRoom;

        let formDisplay;
        if (!createNewFloor) {
            if (numNewRooms === '1') {
                displayValue = newRoomNumber;
            } else {
                endRoom = parseInt(newRoomNumber, NewRoom.RADIX) + parseInt(numNewRooms, NewRoom.RADIX) - 1;
                displayValue = newRoomNumber.toString() + " - " + endRoom.toString();
            }

            formDisplay =
                <div className={'oldFloors'}>
                    <FormGroup>
                        <Label className={"margin-left-35"}>Floor</Label>
                        <Input onClick={this.handleFloorSelect} type={"select"} className={"margin-left-35 width-30"}>
                            <CreateFloorOptions displayAll={false}/>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className={"margin-left-35"} for={"numberRooms"}># New Rooms</Label>
                        <Input onClick={this.handleNumRooms} type={"select"} className={"margin-left-35 width-30"}>
                            <NumberOfRooms total={NewRoom.NUM_ROOMS}/>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className={"margin-left-35"} for={"roomNum"}>
                            New Rooms
                        </Label>
                        <Input type={"text"} className={"margin-left-35 width-30"} id={"roomNum"}
                               value={displayValue} readOnly/>
                    </FormGroup>
                </div>

        } else {
            if (numNewRooms === '1') {
                displayValue = newFloorRoomNum;
            } else {
                endRoom = parseInt(newFloorRoomNum, NewRoom.RADIX) + parseInt(numNewRooms, NewRoom.RADIX) - 1;
                displayValue = newFloorRoomNum.toString() + " - " + endRoom.toString();
            }

            formDisplay =
                <div className={'newFloor'}>
                    <FormGroup>
                        <Label className={"margin-left-35"}>Floor</Label>
                        <Input type={"select"} className={"margin-left-35 width-30"}>
                            <option value={newFloor}>{newFloor / 100}</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className={"margin-left-35"} for={"numberRooms"}># New Rooms</Label>
                        <Input onClick={this.handleNumRooms} type={"select"} className={"margin-left-35 width-30"}>
                            <NumberOfRooms total={NewRoom.NUM_ROOMS}/>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className={"margin-left-35"} for={"roomNum"}>
                            New Rooms
                        </Label>
                        <Input type={"text"} className={"margin-left-35 width-30"} id={"roomNum"}
                               value={displayValue} readOnly/>
                    </FormGroup>
                </div>
        }

        return (
            <div>
                <Helmet>
                    <title>New Room</title>
                </Helmet>
                <div id={"newRoomForm"}>
                    <Form>
                        {formDisplay}
                        <FormGroup check>
                            <Label className={"margin-left-35"} check>
                                <Input onChange={this.handleNewFloor} type={"checkbox"} id={"newFloor"}/>{' '}
                                New Floor
                            </Label>
                            <br/>
                            <Label className={"margin-left-35"} check>
                                <Input type={"checkbox"} id={"isReservable"}/>{' '}
                                Reservable
                            </Label>
                        </FormGroup>
                        <br/>
                        <Button onClick={this.handleNewRoom} color={"primary"}
                                className={"margin-left-35"}>Submit</Button>
                        {' '}
                        <WrappedButton className={"margin-left-35"} link={routes.HOME} name={"Cancel"}
                                       id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewRoom;