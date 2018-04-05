import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {CreateFloorOptions, NumberOfRooms} from "../components/Generators";
import * as routes from "../constants/routes";
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class NewRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomName: '',
            isReservable: true,

            newRoomNumber: null,
            numNewRooms: 1,

            createNewFloor: false,
            newFloor: '',
            newFloorRoomNum: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNumRooms = this.handleNumRooms.bind(this);
        this.handleNewFloor = this.handleNewFloor.bind(this);
        this.handleRoomName = this.handleRoomName.bind(this);
        this.handleReservable = this.handleReservable.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleReservableRoom = this.handleReservableRoom.bind(this);
        this.handleNonReservableRoom = this.handleNonReservableRoom.bind(this);
    }

    static RADIX = 10;
    static NUM_ROOMS = 99;

    componentDidMount() {
        api.generateNewRoomNumber(this, '100');
        api.getNewFloor(this);
    }

    handleNumRooms(e) {
        let numNewRooms = parseInt(e.target.value, NewRoom.RADIX);
        this.setState({
            numNewRooms: numNewRooms,
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
            api.generateNewRoomNumber(this, '100');
        }
    }

    handleRoomName(e) {
        let roomName = e.target.value;
        this.setState({
            roomName: roomName
        });
    }

    handleReservable() {
        this.setState({
            isReservable: !this.state.isReservable
        })
    }

    handleSubmit() {
        let isReservable = this.state.isReservable;
        if (isReservable) {
            this.handleReservableRoom()
        } else {
            this.handleNonReservableRoom()
        }

        // Calling this method refreshes data displayed
        let floor = document.getElementById('floorDisplay').value;
        api.generateNewRoomNumber(this, floor);
    }

    handleReservableRoom() {
        let roomNum, floor, info = this.state;
        let roomName = document.getElementById('roomName').value;

        if (info.createNewFloor) {
            roomNum = info.newFloorRoomNum;
            floor = info.newFloor;
        } else {
            roomNum = info.newRoomNumber;
            floor = document.getElementById('floorDisplay').value;
        }

        if (roomName !== '') {
            api.createNewReservableRoom(floor, roomName);
        } else {
            for (let i = 0; i < info.numNewRooms; i++) {
                api.createNewReservableRoom(floor, roomNum + i);
            }
        }
    }

    handleNonReservableRoom() {
        let room, floor, info = this.state;

        if (info.createNewFloor) {
            floor = info.newFloor;
        } else {
            floor = document.getElementById('floorDisplay').value;
        }

        room = document.getElementById('roomName').value;
        api.createNewNonReservableRoom(floor, room);
    }

    render() {

        let {
            newRoomNumber,
            numNewRooms,
            createNewFloor,
            newFloorRoomNum,
            newFloor,
            isReservable,
            roomName,
        } = this.state;

        let displayValue,
            endRoom,
            newRoomLabel,
            isDisabled = false,
            noNewRoom = false,
            error = false;

        let floorDisplay;
        if (!createNewFloor) {
            if (numNewRooms === 1) {
                displayValue = newRoomNumber;
                newRoomLabel = 'New Room';
            } else {
                endRoom = parseInt(newRoomNumber, NewRoom.RADIX) + numNewRooms - 1;
                displayValue = newRoomNumber.toString() + " - " + endRoom.toString();
                newRoomLabel = 'New Rooms';
            }

            floorDisplay =
                <Input onClick={this.handleFloorSelect} id={'floorDisplay'} type={"select"}
                       className={"col-sm-4 center"}>
                    <CreateFloorOptions displayAll={false}/>
                </Input>

        } else {
            if (numNewRooms === 1) {
                displayValue = newFloorRoomNum;
                newRoomLabel = 'New Room';
            } else {
                endRoom = parseInt(newFloorRoomNum, NewRoom.RADIX) + numNewRooms - 1;
                displayValue = newFloorRoomNum.toString() + " - " + endRoom.toString();
                newRoomLabel = 'New Rooms';
            }

            floorDisplay =
                <Input id={'floorDisplay'} type={"select"} className={"col-sm-4 center"}>
                    <option value={newFloor}>{newFloor / 100}</option>
                </Input>
        }

        let roomNameDisplay;
        if (numNewRooms === 1) {
            roomNameDisplay = <Input onChange={this.handleRoomName} value={roomName} type={"text"}
                                     className={"margin-left-35 width-30"} id={"roomName"}/>
        } else {
            roomNameDisplay = <Input type={"text"} className={"col-sm-4 center"} id={"roomName"}
                                     value={''} readOnly/>
        }

        let numberOfRooms;
        if (isReservable) {

            let totalRooms;
            if (createNewFloor)
                totalRooms = NewRoom.NUM_ROOMS;
            else
                totalRooms = NewRoom.NUM_ROOMS - (newRoomNumber % 100) + 1;

            if (totalRooms === 0) error = true;

            numberOfRooms = <NumberOfRooms total={totalRooms}/>;

        } else {

            if (newRoomNumber % 100 === 0) {
                noNewRoom = true;
                error = true;
            }

            numberOfRooms = <NumberOfRooms total={1}/>;
            displayValue = newRoomNumber;

            if (roomName === '' || noNewRoom)
                isDisabled = true;
        }

        return (
            <div className={"container"}>
                <Helmet>
                    <title>New Room</title>
                    <body className={"background-to-bottom"}/>
                </Helmet>
                <div id={"newRoomForm"}>
                    <Form>
                        <FormGroup row>
                            <div className="col-sm-12 center">
                                <Label for={"newFloor"}>Floor</Label>
                                {floorDisplay}
                            </div>
                        </FormGroup>

                        <FormGroup row>
                            <div className="col-sm-4 center">
                                <Label for={"numberRooms"}># New Rooms</Label>
                                <Input onClick={this.handleNumRooms} type={"select"}>
                                    {numberOfRooms}
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for={"roomNum"}>
                                    {newRoomLabel}
                                </Label>
                                <Input type={"text"} id={"roomNum"}
                                       value={displayValue || ""} readOnly/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-12 center"}>
                                <Label for={"roomName"}>
                                    Room Name (*Optional)
                                </Label>
                                {roomNameDisplay}
                            </div>
                        </FormGroup>
                        <FormGroup check>
                            <div className={"col-sm-4 center"}>
                                <Label check>
                                    <Input onChange={this.handleNewFloor} type={"checkbox"} id={"newFloor"}/>{' '}
                                    New Floor
                                </Label>
                            </div>
                            <br/>
                            <div className={"col-sm-4 center"}>
                                <Label check>
                                    <Input onChange={this.handleReservable} type={"checkbox"}
                                           id={"isNonReservable"}/>{' '}
                                    Non-Reservable
                                </Label>
                            </div>
                        </FormGroup>
                        <br/>
                        <div className={"row"}>
                            <div className={"col-sm-5 center"}>
                                <Button disabled={isDisabled} onClick={this.handleSubmit} color={"primary"}
                                        className={"col-sm-4"}>Submit</Button>
                                {' '}
                                <Button className={"col-sm-4"} link={routes.HOME}> Cancel </Button>
                            </div>
                        </div>
                    </Form>
                    {error && <p typeof={"error"} className={"error center"} id={"error"}>
                        {"No more rooms can be added to this floor."}</p>}
                </div>
            </div>
        );
    }
}

export default NewRoom;