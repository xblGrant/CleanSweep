import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {WrappedButton} from "../components/Buttons";
import {CreateFloorOptions} from "../components/Generators";
import {firebase} from "../firebase";
import * as routes from "../constants/routes";
import GroupSelect from "../selectable/GroupSelect";
import {Helmet} from "react-helmet";

class AssignRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            employees: [],
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleAssignRooms = this.handleAssignRooms.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
        this.clearAssignRooms = this.clearAssignRooms.bind(this);
    }

    getAllRooms() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/NonReservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (room.val().assignedEmployee === 'none') {
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                "n/a",
                                false]
                        );
                    }
                })
            })
        }).then(() => {
            roomRef = firebase.db.ref("/Rooms/Reservable/");
            roomRef.orderByKey().once('value', function (floors) {
                floors.forEach(function (allRooms) {
                    allRooms.forEach(function (room) {
                        if (room.val().assignedEmployee === 'none') {
                            roomList.push(
                                [room.key,
                                    room.val().status,
                                    room.val().incident,
                                    "n/a",
                                    false]
                            );
                        }
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
                if (room.val().assignedEmployee === 'none') {
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            "n/a",
                            false]
                    );
                }
            })
        }).then(() => {
            roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
            roomRef.orderByKey().once('value', function (allRooms) {
                allRooms.forEach(function (room) {
                    if (room.val().assignedEmployee === 'none') {
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                "n/a",
                                false]
                        );
                    }
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
        if (e.target.value === '000')
            this.getAllRooms();
        else
            this.getRoomsByFloor(e.target.value);
    }

    updateRoom(roomPath, assignedEmployee) {
        var updates = {};
        updates[roomPath + 'assignedEmployee'] = assignedEmployee;
        firebase.db.ref().update(updates);
    }

    handleAssignRooms() {
        //TODO: pass in proper parameters, such as selected employee
        this.updateRoom('Rooms/Reservable/100/101/', "Yo");
    }
    clearAssignRooms() {
        //TODO: conceptually same as handle, find error in part commented out below
        var roomPath;
        let roomRef = firebase.db.ref("/Rooms/Reservable/")
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    roomPath = 'Rooms/' + floors.key.toString() + '/' + allRooms.key.toString() + '/' + room.key.toString() + '/';
                    // this.updateRoom(roomPath, "none");
                    console.log(roomPath);
                })
            })
        })
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Assign Rooms</title>
                </Helmet>
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
                        <Button onClick={this.clearAssignRooms} color={"secondary"}>
                            Clear Assignments</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AssignRooms;