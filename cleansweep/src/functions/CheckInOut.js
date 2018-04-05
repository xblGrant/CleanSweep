import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {CreateFloorOptions} from "../components/Generators";
import GroupSelect from "../selectable/GroupSelect";
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class CheckInGuest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            floorNum: '000',
            checkIn: true,
            selectedRooms: null
        };

        this.handleStatus = this.handleStatus.bind(this);
        this.handleCheckIn = this.handleCheckIn.bind(this);
        this.handleCheckOut = this.handleCheckOut.bind(this);
        this.handleSelectionClear = this.handleSelectionClear.bind(this);
        this.handleSelectionFinish = this.handleSelectionFinish.bind(this);
        this.handleCheckInFloorSelect = this.handleCheckInFloorSelect.bind(this);
        this.handleCheckOutFloorSelect = this.handleCheckOutFloorSelect.bind(this);
        this.handleStatusChangeRoomDisplay = this.handleStatusChangeRoomDisplay.bind(this);
    }

    componentDidMount() {
        api.getAvailableRooms(this);
    }

    handleSelectionFinish = selectedItems => {
        let selectedRooms = [];
        for (let i = 0; i < selectedItems.length; i++)
            selectedRooms[i] = selectedItems[i].props;

        if (selectedRooms === []) selectedRooms = null;
        this.setState({ selectedRooms: selectedRooms})
    };

    handleSelectionClear() {
        this.setState({ selectedRooms: null })
    }

    handleCheckInFloorSelect(e) {
        if (e.target.value === '000')
            api.getAvailableRooms(this);
        else
            api.getAvailableRoomsByFloor(this, e.target.value);

        this.setState({
            floorNum: e.target.value,
            selectedRooms: null
        })
    }

    handleCheckOutFloorSelect(e) {
        if (e.target.value === '000')
            api.getAllReservedRooms(this);
        else
            api.getAllReservedRoomsByFloor(this, e.target.value);

        this.setState({
            floorNum: e.target.value,
            selectedRooms: null
        })
    }

    handleStatusChangeRoomDisplay(floor, checkIn) {
        if (checkIn) {
            if (floor === '000')
                api.getAvailableRooms(this);
            else
                api.getAvailableRoomsByFloor(this, floor);
        } else {
            if (floor === '000')
                api.getAllReservedRooms(this);
            else
                api.getAllReservedRoomsByFloor(this, floor);
        }
    }

    handleStatus(e) {
        let value = e.target.value;
        let checkIn = true;
        if (value === 'checkOut')
            checkIn = false;

        this.setState({
            checkIn: checkIn,
            selectedRooms: null
        });

        this.handleStatusChangeRoomDisplay(this.state.floorNum, checkIn);
    }

    handleCheckIn() {
        let {selectedRooms} = this.state;
        for (let i = 0; i < selectedRooms.length; i++)
            api.checkIn(this, selectedRooms[i].floor, selectedRooms[i].roomName);
        this.handleStatusChangeRoomDisplay(this.state.floorNum, true);
    }

    handleCheckOut() {
        let {selectedRooms} = this.state;
        for (let i = 0; i < selectedRooms.length; i++)
            api.checkOut(this, selectedRooms[i].floor, selectedRooms[i].roomName);
        this.handleStatusChangeRoomDisplay(this.state.floorNum, false);
    }

    render() {

        let {checkIn} = this.state;
        let isDisabled =
            this.state.selectedRooms === null;

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
                        <div className={"col-sm-10 center"}>
                            <Label className={"center"}>Rooms</Label>
                            <GroupSelect items={this.state.rooms}
                                         onSelectionFinish={this.handleSelectionFinish}
                                         onSelectionClear={this.handleSelectionClear}
                                         isDisabled={false}/>
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