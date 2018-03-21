import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import {firebase} from '../firebase';

class AllRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
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

    componentDidMount() {
       this.getAllRooms();
    }

    render() {
        return (
            <div>
                <head>
                    <title>All Rooms</title>
                </head>
                <div id={"loadRooms"}>
                    <Form>
                        <div className={"center"}>
                            <div className={"container text-center"}>
                                <Label className={"center"}>All Rooms</Label>
                            </div>
                            <GroupSelect items={this.state.rooms}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AllRooms;