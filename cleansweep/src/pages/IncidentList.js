import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { CreateRoomOptions, CreateFloorOptions} from '../components/Generators';
import {firebase} from "../firebase";

//TODO: finish dropdown menu to select individual room to load comments

class IncidentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };
        // this.handleIncidentSelect = this.handleIncidentSelect.bind(this);
    }

    componentDidMount() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Incidents/");
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                roomList.push(room.key);
                room.forEach(function (inspection) {
                    roomList.push("   " + inspection.val());
            })})
        }).then( () =>
            this.setState({
                rooms: roomList
            })
        )
    }

    // handleIncidentSelect(e) {
    //     let roomList = [];
    //     let roomRef = firebase.db.ref("/Incidents/" + e.target.value);
    //     roomRef.orderByKey().once('value', function (allRooms) {
    //         allRooms.forEach(function (room) {
    //             roomList.push(room.key);
    //         })
    //     }).then(() =>
    //         this.setState({
    //             rooms: roomList
    //         })
    //     )
    // }


    render() {
        return (
            <div>
                <head>
                    <title>Incident List</title>
                </head>
                <div id={"loadIncidents"}>
                    <Form>
                        {/*<FormGroup>*/}
                            {/*<Label id={"label"} for="roomSelect">Room</Label>     can't find where floor select is*/}
                            {/*<Input onClick={this.handleIncidentSelect} type="select" className="floorSelect" id="floorSelect">*/}
                                {/*<CreateFloorOptions />*/}
                            {/*</Input>*/}
                        {/*</FormGroup>*/}
                        <FormGroup row>
                            <Label id={"label"} for="commentList">Comments</Label>
                            <Input id={"roomOptions"} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default IncidentList;