import React from 'react';
import { CreateFloorOptions, CreateRoomOptions } from "../components/Generators";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class InspectRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            selectedRoom: null,
            areReservableRooms: false
        };

        this.handleInspect = this.handleInspect.bind(this);
        this.handleDecline = this.handleDecline.bind(this);
        this.handleRoomType = this.handleRoomType.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleSelectedRoom = this.handleSelectedRoom.bind(this);

    }

    componentDidMount() {
        // TODO: query on inspect field of each room
        api.getListofAllRoomsNeedInspected(this);
    }

    handleRoomType() {
        this.setState({
            areReservableRooms: !this.state.areReservableRooms,
            selectedRoom: null
        });

        let {areReservableRooms} = this.state;
        let floor = document.getElementById('floorSelect').value;

        if (areReservableRooms) {
            if (floor === '000')
                api.getListofAllReservableRooms(this);
            else
                api.getListofAllReservableRoomsByFloor(this, floor);
        } else {
            if (floor === '000')
                api.getListofAllNonReservableRooms(this);
            else
                api.getListofAllNonReservableRoomsByFloor(this, floor);
        }
    }

    handleFloorSelect(e) {
        if (e.target.value === '000')
            api.getListofAllRoomsNeedInspected(this);
        else
            api.getListofAllRoomsNeedInspectedByFloor(this, e.target.value);
    }

    handleSelectedRoom(e) {
        let room = e.target.value;
        if (room === '') {room = null}
        this.setState({
            selectedRoom: room
        })
    }

    handleInspect() {
        // TODO: implement when inspection is approved
    }

    handleDecline() {
        // TODO: implement when inspection is declined
        // TODO: should set the room status = dirty, isReservable = false,
    }

    render() {
        return (
            <div className="container">
                <Helmet>
                    <title>Inspect Room</title>
                </Helmet>
                <Form>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            <Label for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" id="floorSelect">
                                <CreateFloorOptions />
                            </Input>
                        </div>
                    </FormGroup>

                    <FormGroup check>
                        <Label className={"margin-left-35"} check>
                            <Input onChange={this.handleRoomType} type={"checkbox"} id={"isNonReservable"}/>{' '}
                            Non-Reservable Rooms
                        </Label>
                    </FormGroup>

                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            <Label for="assignableRoom">Rooms</Label>
                            <Input type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </div>
                    </FormGroup>

                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-5 center"}>
                            <Button className={"col-sm-4"} onClick={this.handleInspect} color={"primary"}>Approve</Button>
                            <Button className={"col-sm-4"} onClick={this.handleDecline} color={"danger"}>Decline</Button>
                            <Button className={"col-sm-4"} href={routes.HOME}> Cancel </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default InspectRoom;