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

    componentDidMount() {
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
                                assigned
                            ]
                        );
                    })
                })
        }).then(() => {
            this.setState({
                rooms: roomList
            })
            // roomRef = firebase.db.ref("/Rooms/NonReservable/");
            // roomRef.orderByKey().once('value', function (floors) {
            //     floors.forEach(function (allRooms) {
            //         allRooms.forEach(function (room) {
            //             roomList.push(
            //                 [room.key,
            //                     room.val().status,
            //                     room.val().incident,
            //                     room.val().assignedEmployee]
            //             );
            //         })
            //     })
            // }).then(() =>
            //     this.setState({
            //         rooms: roomList
            //     })
            // )
        });
    }

    render() {
        return (
            <div>
                <head>
                    <title>All Rooms</title>
                </head>
                <div id={"loadRooms"}>
                    <Form>
                        <Label id={"select_label"}>All Rooms</Label>
                        {console.log(this.state.rooms)}
                        <GroupSelect items={this.state.rooms}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AllRooms;