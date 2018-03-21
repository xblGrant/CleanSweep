import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {WrappedButton} from "../components/Buttons";
import {CreateFloorOptions, CreateRoomOptions} from "../components/Generators";
import {firebase} from "../firebase";
import * as routes from "../constants/routes";
import GroupSelect from "../selectable/GroupSelect";

class AssignRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            employees: [],
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleAssignRooms = this.handleAssignRooms.bind(this);
    }

    getAllRooms() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().guest,
                            assigned]
                    );
                })
            })
        }).then(() => {
            roomRef = firebase.db.ref("/Rooms/NonReservable/");
            roomRef.orderByKey().once('value', function (floors) {
                floors.forEach(function (allRooms) {
                    allRooms.forEach(function (room) {
                        let assigned = (room.val().assignedEmployee !== 'none');
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                "n/a",
                                assigned]
                        );
                    })
                })
            }).then(() =>
                this.setState({
                    rooms: roomList
                })
            )
        });
    }

    getAllEmployees() {
        let employeeList = [];
        let empRef = firebase.db.ref("/Employee");
        empRef.orderByKey().once('value', function (allEmployees) {
            allEmployees.forEach(function (employee) {
                employeeList.push(
                    [employee.val().username,
                        employee.val().email,
                        null,
                        null
                    ]
                );
            })
        }).then(() =>
            this.setState({
                employees: employeeList
            })
        );
    }

    getRoomsByFloor(floor) {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                let assigned = (room.val().assignedEmployee !== 'none');
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().guest,
                        assigned]
                );
            })
        }).then(() => {
            roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
            roomRef.orderByKey().once('value', function (allRooms) {
                allRooms.forEach(function (room) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            "n/a",
                            assigned]
                    );
                })
            }).then(() =>
                this.setState({
                    rooms: roomList
                })
            )
        })
    }

    componentDidMount() {
        this.getAllRooms();
        this.getAllEmployees();
    }

    handleFloorSelect(e) {
        console.log(e.target.value);
        if (e.target.value === 0)
            this.getAllRooms();
        else {
            this.getRoomsByFloor(e.target.value);
        }
    }

    handleAssignRooms() {
        //TODO: handle assigning rooms to employees
    }

    render() {
        return (
            <div>
                <head>
                    <title>Assign Rooms</title>
                </head>
                <div className={"margin-top-02"}>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" className="margin-left-35 width-30">
                                <CreateFloorOptions/>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"center"}>
                                <div className={"container text-center"}>
                                    <Label className={"center"}>Rooms</Label>
                                </div>
                                <GroupSelect items={this.state.rooms} isDisabled={false}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"center"}>
                                <div className={"container text-center"}>
                                    <Label className={"center"}>Employees</Label>
                                </div>
                                <GroupSelect items={this.state.employees} isDisabled={false}/>
                            </div>
                        </FormGroup>
                        <Button onClick={this.handleAssignRooms} color={"primary"}
                                className={"margin-left-35"}>Assign</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AssignRooms;