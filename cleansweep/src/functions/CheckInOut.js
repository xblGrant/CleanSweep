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
            selectedRooms: null,
            submitted: false
        };

        this.isSubmitted = this.isSubmitted.bind(this);
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

    isSubmitted(val) {
        this.setState({submitted: val});
    }

    handleSelectionFinish = selectedItems => {
        let selectedRooms = [];
        for (let i = 0; i < selectedItems.length; i++)
            selectedRooms[i] = selectedItems[i].props;

        if (selectedRooms === []) selectedRooms = null;
        this.setState({ selectedRooms: selectedRooms});
        this.isSubmitted(false);
    };

    handleSelectionClear() {
        this.setState({ selectedRooms: null });
        this.isSubmitted(false);
    }

    handleCheckInFloorSelect(e) {
        if (e.target.value === '000')
            api.getAvailableRooms(this);
        else
            api.getAvailableRoomsByFloor(this, e.target.value);

        this.setState({
            floorNum: e.target.value,
            selectedRooms: null
        });
        this.isSubmitted(false);
    }

    handleCheckOutFloorSelect(e) {
        if (e.target.value === '000')
            api.getAllReservedRooms(this);
        else
            api.getAllReservedRoomsByFloor(this, e.target.value);

        this.setState({
            floorNum: e.target.value,
            selectedRooms: null
        });
        this.isSubmitted(false);
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
        this.isSubmitted(false);
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
        this.isSubmitted(false);
    }

    handleCheckIn() {
        let {selectedRooms} = this.state;
        for (let i = 0; i < selectedRooms.length; i++)
            api.checkIn(this, selectedRooms[i].floor, selectedRooms[i].roomName);
        this.handleStatusChangeRoomDisplay(this.state.floorNum, true);
        this.isSubmitted(true);
    }

    handleCheckOut() {
        let {selectedRooms} = this.state;
        for (let i = 0; i < selectedRooms.length; i++)
            api.checkOut(this, selectedRooms[i].floor, selectedRooms[i].roomName);
        this.handleStatusChangeRoomDisplay(this.state.floorNum, false);
        this.isSubmitted(true);
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
        let submissionMessage = (checkIn) ? "Check-In successful" : "Check-Out successful";

        return (
            <div className={"container"}>
                <Helmet>
                    <title>Check-In Guest</title>
                    <body className={"background-to-bottom"}/>
                </Helmet>
                <div>
                    <Form>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="floorSelect">Floor</Label>
                                <Input onClick={floorFunction} type="select" id="floorSelect">
                                    <CreateFloorOptions/>
                                </Input>
                            </div>
                        </FormGroup>
                        <div className={"col-sm-4 center"}>
                            <Input type={"select"} onClick={this.handleStatus}>
                                <option value={"checkIn"}>Check-In</option>
                                <option value={"checkOut"}>Check-Out</option>
                            </Input>
                        </div>
                        
                        {/*This gets overwritten by the second this.state call*/}
                        {this.state.submitted && <p className={"submission"} id={"submitMessage"}>
                            {submissionMessage}</p>}
                        <br/>
                        <div className={"row"}>
                            <div className={"col-sm-5 center"}>
                                {button}
                                <Button className={"col-sm-4"} href={routes.HOME} name={"Cancel"}> Cancel </Button>
                            </div>
                        </div>
                        <FormGroup row>
                            <div className={"col-sm-10 center"}>
                                <Label className={"center"}>Rooms</Label>

                                {/*This overwrites the above message code*/}
                                <GroupSelect items={this.state.rooms}
                                             onSelectionFinish={this.handleSelectionFinish}
                                             onSelectionClear={this.handleSelectionClear}
                                             isDisabled={false}/>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CheckInGuest;