import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import {firebase} from '../firebase';

class AvailableRooms extends React.Component {
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
                    if (room.val().isReservable === 'true') {
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
            this.setState({
                rooms: roomList
            });
        });
    }

    render() {
        return (
            <div>
                <head>
                    <title>Available Rooms</title>
                </head>
                <div>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"header center"}>Available Rooms</Label>
                        </div>
                        <GroupSelect items={this.state.rooms}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AvailableRooms;