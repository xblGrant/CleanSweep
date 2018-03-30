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
            api.generateNewRoomNumber(this);
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
        // TODO: handle isReservable and pass in generated room value
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
        //TODO: handle proper floor here
        let roomNum, floor, info = this.state;
        let roomName = document.getElementById('roomName').value;

        if (info.createNewFloor){
            roomNum = info.newFloorRoomNum;
            floor = info.newFloor;
        } else {
            roomNum = info.newRoomNumber;
            floor = document.getElementById('floorDisplay').value;
        }

        if (roomName !== ''){
            api.createNewReservableRoom(floor, roomName);
        } else {
            for (let i = 0; i < info.numNewRooms; i++) {
                api.createNewReservableRoom(floor, roomNum + i);
            }
        }
    }

    handleNonReservableRoom() {
        let room, floor, info = this.state;

        if (info.createNewFloor){
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
            roomName
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
                <div className={'oldFloors'}>
                    <FormGroup>
                        <Label className={"margin-left-35"}>Floor</Label>
                        <Input onClick={this.handleFloorSelect} id={'floorDisplay'} type={"select"} className={"margin-left-35 width-30"}>
                            <CreateFloorOptions displayAll={false}/>
                        </Input>
                    </FormGroup>
                </div>

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
                <div className={'newFloor'}>
                    <FormGroup>
                        <Label className={"margin-left-35"}>Floor</Label>
                        <Input id={'floorDisplay'} type={"select"} className={"margin-left-35 width-30"}>
                            <option value={newFloor}>{newFloor / 100}</option>
                        </Input>
                    </FormGroup>
                </div>
        }

        let roomNameDisplay;
        if (numNewRooms === 1){
            roomNameDisplay =  <Input onChange={this.handleRoomName} value={roomName} type={"text"} className={"margin-left-35 width-30"} id={"roomName"}/>
        } else {
            roomNameDisplay = <Input type={"text"} className={"margin-left-35 width-30"} id={"roomName"}
                              value={''} readOnly/>
        }

        let numberOfRooms;
        if (isReservable){

            let totalRooms;
            if (createNewFloor)
                totalRooms = NewRoom.NUM_ROOMS;
            else
                totalRooms = NewRoom.NUM_ROOMS - (newRoomNumber % 100) + 1;

            // TODO: add an warning when all possible rooms have been added to a floor (#99)

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
            <div>
                <Helmet>
                    <title>New Room</title>
                </Helmet>
                <div id={"newRoomForm"}>
                    <Form>
                        {floorDisplay}
                        <FormGroup>
                            <Label className={"margin-left-35"} for={"numberRooms"}># New Rooms</Label>
                            <Input onClick={this.handleNumRooms} type={"select"} className={"margin-left-35 width-30"}>
                                {numberOfRooms}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"} for={"roomNum"}>
                                {newRoomLabel}
                            </Label>
                            <Input type={"text"} className={"margin-left-35 width-30"} id={"roomNum"}
                                   value={displayValue} readOnly/>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"} for={"roomName"}>
                                Room Name (*Optional)
                            </Label>
                            {roomNameDisplay}
                        </FormGroup>
                        <FormGroup check>
                            <Label className={"margin-left-35"} check>
                                <Input onChange={this.handleNewFloor} type={"checkbox"} id={"newFloor"}/>{' '}
                                New Floor
                            </Label>
                            <br/>
                            <Label className={"margin-left-35"} check>
                                <Input onChange={this.handleReservable} type={"checkbox"} id={"isNonReservable"}/>{' '}
                                Non-Reservable
                            </Label>
                        </FormGroup>
                        <br/>
                        <Button disabled={isDisabled} onClick={this.handleSubmit} color={"primary"}
                                className={"margin-left-35"}>Submit</Button>
                        {' '}
                        <WrappedButton className={"margin-left-35"} link={routes.HOME} name={"Cancel"}
                                       id={"wrappedButton"}/>
                    </Form>
                    {error && <p typeof={"error"} className={"error center"} id={"error"}>
                        {"No more rooms can be added to this floor."}</p>}
                </div>
            </div>
        );
    }
}

export default NewRoom;