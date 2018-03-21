import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';
import {firebase} from "../firebase/index";

const radix = 10;

function CreateRoomOptions(props) {
    return (
        props.rooms.map(
            (roomNum) => {
                return (
                    <option value={roomNum}>{roomNum}</option>
                )
            }
        )
    );
}

class CreateFloorOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            floors: []
        }
    }

    componentDidMount() {
        let floorList = [0];
        let floorRef = firebase.db.ref("/Rooms/Reservable");
        floorRef.orderByKey().once('value', function (allFloors) {
            allFloors.forEach(function (floor) {
                floorList.push(floor.key);
            })
        }).then(() => {
            this.setState({
                floors: floorList
            })
        });
    }

    render() {
        let floors = this.state.floors;

        return (
            floors.map(
                (floorNum) => {
                    return (
                        (floorNum !== 0) ?
                            <option value={floorNum}>{parseInt(floorNum, radix) / 100}</option> :
                            <option value={'000'}>All</option>
                    )
                }))
    }
}


// This displays all rooms equal to guests = "none" -> means rooms are open to be reserved
class AvailableRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        let roomList = [];
        let ref = firebase.db.ref("/Rooms/Reservable");

        ref.orderByKey().once('value', function (allFloors) {
            allFloors.forEach(function (floors) {
                floors.forEach(function (rooms) {
                    if (rooms.val().guest === "none")
                        roomList.push(rooms.val().room);
                })
            })
        }).then(() => {
            this.setState({
                rooms: roomList
            });
        });
    }

    render() {
        return (
            <FormGroup id={this.props.id}>
                <Label className={"margin-left-35"} for="floorSelect">Rooms</Label>
                <Input className={"margin-left-35"} type="select" /*onClick={this.props.onClick}*/ multiple>
                    <CreateRoomOptions rooms={this.state.rooms}/>
                </Input>
            </FormGroup>
        );
    }
}

// This displays all rooms equal to guests != "none" -> means rooms are not open to be reserved
class UnavailableRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        let roomList = [];
        let ref = firebase.db.ref("/Rooms/Reservable");

        ref.orderByKey().once('value', function (allFloors) {
            allFloors.forEach(function (floors) {
                floors.forEach(function (rooms) {
                    if (rooms.val().guest !== "none")
                        roomList.push(rooms.val().room);
                })
            })
        }).then(() => {
            this.setState({
                rooms: roomList
            });
        });
    }

    render() {
        return (
            <FormGroup id={this.props.id}>
                <Label id={"label"} for="floorSelect">Rooms</Label>
                <Input type="select" multiple>
                    <CreateRoomOptions rooms={this.state.rooms}/>
                </Input>
            </FormGroup>
        );
    }
}

export {
    CreateFloorOptions,
    CreateRoomOptions,
    AvailableRooms,
    UnavailableRooms
};
