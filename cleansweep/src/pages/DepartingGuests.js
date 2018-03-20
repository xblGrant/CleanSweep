import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import {firebase} from '../firebase';

class DepartingGuests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };
    }

    componentDidMount() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (room.val().departureDate === today) {
                        let assigned = (room.val().assignedEmployee !== 'none');
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                room.val().guest,
                                assigned]
                        );
                    }})})
        }).then(() => {
            // roomRef = firebase.db.ref("/Rooms/NonReservable/");
            // roomRef.orderByKey().once('value', function (floors) {
            //     floors.forEach(function (allRooms) {
            //         allRooms.forEach(function (room) {
            //             if (room.val().departureDate === today) {
            //                 let assigned = (room.val().assignedEmployee !== 'none');
            //                 roomList.push(
            //                     [room.key,
            //                         room.val().status,
            //                         room.val().incident,
            //                         room.val().guest,
            //                         assigned]
            //                 );
            //             }})})
            // }).then(() =>
                this.setState({
                    rooms: roomList
                })
            // )
        });
    }

    render() {
        return (
            <div>
                <head>
                    <title>Departing Guests</title>
                </head>
                <div id={"loadRooms"}>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"header"} id={"select_label"}>Rooms with Departing Guests</Label>
                        </div>
                        <GroupSelect items={this.state.rooms}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default DepartingGuests;