import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import {firebase} from '../firebase';

class InspectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    getInspectRooms() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    // TODO: need to confirm how we determine a room needs to be inspected  (guest = none? & isReservable = false?)
                    if (room.val().incident === false && room.val().status === 'Clean') {
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

    componentDidMount() {
        this.getInspectRooms();
    }

    render() {
        return (
            <div>
                <head>
                    <title>Inspections</title>
                </head>
                <div>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"header"}>Rooms needing Inspection</Label>
                        </div>
                        <GroupSelect items={this.state.rooms}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default InspectList;