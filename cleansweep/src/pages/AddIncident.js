import React from 'react';
import { WrappedButton } from "../components/Buttons";
import { CreateFloorOptions, CreateRoomOptions } from "../components/Generators";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import {firebase} from "../firebase";

class AddIncident extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleIncident = this.handleIncident.bind(this);
    }

    componentDidMount() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/100");
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                roomList.push(room.key);
            })
        }).then( () =>
            this.setState({
                rooms: roomList
            })
        )
    }

    handleFloorSelect(e) {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/" + e.target.value);
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                roomList.push(room.key);
            })
        }).then( () =>
            this.setState({
                rooms: roomList
            })
        )
    }

    handleIncident() {

    }

    render() {
        return (
            <div>
                <head>
                    <title>Incident Report</title>
                </head>
                <div className={"margin-top-02"}>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" className="margin-left-35 width-30" id="floorSelect">
                                <CreateFloorOptions/>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input className={"margin-left-35 width-30"} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="incidentComment">Comment</Label>
                            <Input type="textarea" className={"margin-left-35 width-30"} id="incidentComment" placeholder={"Enter comment here"}/>
                        </FormGroup>
                        <Button onClick={this.handleIncident} className={"margin-left-35"} color={"primary"}>Submit</Button>
                        {' '}
                        <WrappedButton link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddIncident;