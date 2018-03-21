import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import {firebase} from '../firebase';

class WakeUpList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    getWakeUpCalls() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (room.val().wakeupCall !== 'none') {
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

    // TODO: instead of links for rooms, keep rooms selectable and display wake up time for room when selected
    componentDidMount() {
        this.getWakeUpCalls();
    }

    render() {
        return (
            <div>
                <head>
                    <title>Wake-Up Calls</title>
                </head>
                <div>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"header"}>Wake-Up Calls by Room</Label>
                        </div>
                        <GroupSelect items={this.state.rooms}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default WakeUpList;