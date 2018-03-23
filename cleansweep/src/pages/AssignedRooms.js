import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import {firebase} from '../firebase';
import {Helmet} from "react-helmet";

class AssignedRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    getAssignedRoom() {
        let roomList = [];
        let user = null;
        let currentUser = firebase.auth.currentUser;
        if (currentUser !== null) {
            user = currentUser.uid;
        }

        let roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (user === room.val().assignedEmployee) {
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                room.val().guest,
                                true
                            ]
                        );
                    }
                })
            })
        }).then(() => {
            roomRef = firebase.db.ref("/Rooms/NonReservable/");
            roomRef.orderByKey().once('value', function (floors) {
                floors.forEach(function (allRooms) {
                    allRooms.forEach(function (room) {
                        if (user === room.val().assignedEmployee) {
                            roomList.push(
                                [room.key,
                                    room.val().status,
                                    room.val().incident,
                                    "n/a",
                                    true
                                ]
                            );
                        }
                    })
                })
            }).then(() =>
                this.setState({
                    rooms: roomList
                }));
        });
    }

    componentDidMount() {
        this.getAssignedRoom();
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Assigned Rooms</title>
                </Helmet>
                <div id={"loadRooms"}>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"center"}>Assigned Rooms</Label>
                        </div>
                        <GroupSelect items={this.state.rooms}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AssignedRooms;