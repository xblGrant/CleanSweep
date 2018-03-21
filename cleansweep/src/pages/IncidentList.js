import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import {firebase} from '../firebase';

class IncidentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    getIncidentRooms() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (room.val().incident === true) {
                        let assigned = (room.val().assignedEmployee !== 'none');
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                room.val().guest,
                                assigned
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
                        if (room.val().incident === true) {
                            let assigned = (room.val().assignedEmployee !== 'none');
                            roomList.push(
                                [room.key,
                                    room.val().status,
                                    room.val().incident,
                                    "n/a",
                                    assigned
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
        this.getIncidentRooms();
    }

    render() {
        return (
            <div>
                <head>
                    <title>Incidents</title>
                </head>
                <div>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"header"}>Rooms with Incidents</Label>
                        </div>
                        <GroupSelect items={this.state.rooms}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default IncidentList;