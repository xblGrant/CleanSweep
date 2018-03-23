import React from 'react';
import { WrappedButton } from "../components/Buttons";
import { CreateFloorOptions, CreateRoomOptions } from "../components/Generators";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import {firebase} from "../firebase";
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class InspectRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
        };

        this.handleInspect = this.handleInspect.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    getAllRooms() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/NonReservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (!room.val().incident && room.val().status === 'Clean')
                        roomList.push(room.key);
                })
            })
        }).then(() => {
            roomRef = firebase.db.ref("/Rooms/Reservable/");
            roomRef.orderByKey().once('value', function (floors) {
                floors.forEach(function (allRooms) {
                    allRooms.forEach(function (room) {
                        if (!room.val().incident && room.val().status === 'Clean'
                            && room.val().guest === 'none' && !room.val().isReservable)
                            roomList.push(room.key);
                    })
                })
            }).then(() =>
                this.setState({
                    rooms: roomList
                })
            )
        });
    }

    getRoomsByFloor(floor) {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                if (!room.val().incident && room.val().status === 'Clean')
                    roomList.push(room.key);
            })
        }).then(() => {
            roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
            roomRef.orderByKey().once('value', function (allRooms) {
                allRooms.forEach(function (room) {
                    if (!room.val().incident && room.val().status === 'Clean'
                        && room.val().guest === 'none' && !room.val().isReservable)
                        roomList.push(room.key);
                })
            }).then(() => {
                this.setState({
                    rooms: roomList
                })
            })
        })
    }

    componentDidMount() {
        this.getAllRooms();
    }

    handleFloorSelect(e) {
        if (e.target.value === '000')
            this.getAllRooms();
        else
            this.getRoomsByFloor(e.target.value);
    }

    handleInspect() {

    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Inspect Room</title>
                </Helmet>
                <div className={"margin-top-02"}>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" className="margin-left-35 width-30" id="floorSelect">
                                <CreateFloorOptions />
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="assignableRoom">Rooms</Label>
                            <Input className={"margin-left-35 width-30"} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="inspectComment">Comment</Label>
                            <Input type="textarea" className={"margin-left-35 width-30"} placeholder={"Enter comment here"}/>
                        </FormGroup>
                        <Button onClick={this.handleCheckIn} color={"primary"} className={"margin-left-35"}>Submit</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default InspectRoom;