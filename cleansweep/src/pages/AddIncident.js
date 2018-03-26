import React from 'react';
import {CreateFloorOptions, CreateRoomOptions} from "../components/Generators";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class AddIncident extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleIncident = this.handleIncident.bind(this);
        this.handleIncident = this.handleIncident.bind(this);
    }


    componentDidMount() {
        api.getListofAllRooms(this);
    }

    handleFloorSelect(e) {
        if (e.target.value === '000')
            api.getListofAllRooms(this);
        else
            api.getListofAllRoomsByFloor(this, e.target.value);
    }

    handleIncident() {
        //TODO: set these using this.state
        // let path, room, commentInput;
        // path = 'Rooms/Reservable/100/';
        // room = '101';
        // commentInput = "stain on rug";
        //
        // //This will update the incident field in the actual room
        // let updates = {};
        // updates[path + room +  '/' + 'incident'] = true;
        // firebase.db.ref().update(updates);
        //
        // //this will create an instance of the incident in the Incidents part of the db
        // firebase.db.ref('Incidents/' + room).set({
        //     comment: commentInput
        // });
    }

    render() {
        return (
            <div className={"container"}>
                <Helmet>
                    <title>Incident Report</title>
                </Helmet>
                <div className={"margin-top-02"}>
                    <Form>
                        <FormGroup>
                            <Label className={"col-sm-4 center"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select"
                                   className={"col-sm-4 center"} id="floorSelect">
                                <CreateFloorOptions/>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Input className={"col-sm-4 center"} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label className={"col-sm-4 center"} for="incidentComment">Comment</Label>
                            <Input type="textarea" className={"col-sm-4 center"} id="incidentComment"
                                   placeholder={"Enter comment here"}/>
                        </FormGroup>

                        <div className={"row"}>
                            <div className={"col-sm-4 center"}>
                                <Button onClick={this.handleIncident} className={"col-sm-4"}
                                        color={"primary"}>Submit</Button>
                                {' '}
                                <Button link={"/"} className={"col-sm-4"} id={"Button"}>Cancel</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddIncident;