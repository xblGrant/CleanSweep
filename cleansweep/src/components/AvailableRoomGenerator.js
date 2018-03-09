import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';
import {firebase} from "../firebase";

// This displays all rooms equal to guests = "none" -> means rooms are open to be reserved

function CreateOptions(props){
    return (
        props.rooms.map(
            (roomNum) => {
                return (
                    <option value={roomNum}>{roomNum}</option>
                )
            }
        )
    );
}

class AvailableRoomGenerator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        let roomList = [];
        let ref = firebase.db.ref("/Rooms/Reservable");

        ref.orderByKey().once('value', function(allFloors) {
            allFloors.forEach( function(floors) {
                floors.forEach( function(rooms) {
                    if (rooms.val().guest === "none")
                        roomList.push(rooms.val().room);
                })
            })
        }).then( () => {
            this.setState({
                rooms: roomList
            });
        });
    }

    render() {
        return (
            <FormGroup id={this.props.id}>
                <Label id={"label"} for="floorSelect">Rooms</Label>
                <Input type="select" /*onClick={this.props.onClick}*/ multiple>
                    <CreateOptions rooms={this.state.rooms}/>
                </Input>
            </FormGroup>
        );
    }
}

export default AvailableRoomGenerator;