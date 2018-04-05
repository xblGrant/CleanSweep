import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {CreateRoomOptions, CreateFloorOptions} from "../components/Generators";
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class CheckInGuest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            roomNum: null,
            floorNum: '000',
            roomPath: null,
            checkIn: true
        };

        this.handleCheckIn = this.handleCheckIn.bind(this);
        this.handleCheckOut = this.handleCheckOut.bind(this);
        this.handleCheckInFloorSelect = this.handleCheckInFloorSelect.bind(this);
        this.handleCheckOutFloorSelect = this.handleCheckOutFloorSelect.bind(this);
        this.handleRoomSelect = this.handleRoomSelect.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleStatusChangeRoomDisplay = this.handleStatusChangeRoomDisplay.bind(this);
    }

    componentDidMount() {
        // api.getListofAllAvailableRooms(this);
    }

    handleCheckInFloorSelect(e) {
        if (e.target.value === '000')
            api.getListofAllAvailableRooms(this);
        else
            api.getListofAllAvailableRoomsByFloor(this, e.target.value);

        this.setState({
            floorNum: e.target.value,
            roomNum: null
        })
    }

    handleCheckOutFloorSelect(e) {
        if (e.target.value === '000')
            api.getListofAllReservedRooms(this);
        else
            api.getListofAllReservedRoomsByFloor(this, e.target.value);

        this.setState({
            floorNum: e.target.value,
            roomNum: null
        })
    }

    handleRoomSelect(e) {
        let roomNum = e.target.value;
        this.setState({
            roomNum: roomNum
        });
    }

    handleStatusChangeRoomDisplay(floor, checkIn) {
        if (checkIn) {
            if (floor === '000')
                api.getListofAllAvailableRooms(this);
            else
                api.getListofAllAvailableRoomsByFloor(this, floor);
        } else {
            if (floor === '000')
                api.getListofAllReservedRooms(this);
            else
                api.getListofAllReservedRoomsByFloor(this, floor);
        }
    }

    handleStatus(e) {
        let value = e.target.value;
        let checkIn = true;
        if (value === 'checkOut')
            checkIn = false;

        this.setState({
            checkIn: checkIn,
            roomNum: null
        });

        this.handleStatusChangeRoomDisplay(this.state.floorNum, checkIn);
    }

    handleCheckIn() {
        let floor = Math.floor(this.state.roomNum / 100) * 100;
        api.checkIn(this, floor, this.state.roomNum);
        this.handleStatusChangeRoomDisplay(this.state.floorNum, true);
    }

    handleCheckOut() {
        let floor = Math.floor(this.state.roomNum / 100) * 100;
        api.checkOut(this, floor, this.state.roomNum);
        this.handleStatusChangeRoomDisplay(this.state.floorNum, false);
    }

    render() {

        let {checkIn} = this.state;
        let isDisabled =
            this.state.roomNum === null;

        let button = (checkIn) ?
            <Button disabled={isDisabled} className={"col-sm-4"}
                    onClick={this.handleCheckIn} color={"primary"}>Check-In</Button>
            : <Button disabled={isDisabled} className={"col-sm-4"}
                      onClick={this.handleCheckOut} color={"primary"}>Check-Out</Button>;
        let floorFunction = (checkIn) ? this.handleCheckInFloorSelect : this.handleCheckOutFloorSelect;

        return (
            <div className={"container"}>
                <Helmet>
                    <title>Check-In Guest</title>
                    <body className={"background-to-bottom"}/>
                </Helmet>
                <br/>
                <Form>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            <Label for="floorSelect">Floor</Label>
                            <Input onClick={floorFunction} type="select" id="floorSelect">
                                <CreateFloorOptions/>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            <Label for="floorSelect">Rooms</Label>
                            <Input onClick={this.handleRoomSelect} id={'roomOptions'} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </div>
                    </FormGroup>
                    <div className={"center"} onChange={this.handleStatus}>
                        <input type={"radio"} name={"status"} value={"checkIn"}/> Check-In<br/>
                        <input type={"radio"} name={"status"} value={"checkOut"}/> Check-Out<br/>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-5 center"}>
                            {button}
                            <Button className={"col-sm-4"} href={routes.HOME} name={"Cancel"}> Cancel </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CheckInGuest;