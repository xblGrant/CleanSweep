import React from 'react';
import {WrappedButton} from "../components/Buttons";
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
            <div>
                <Helmet>
                    <title>Incident Report</title>
                </Helmet>
                <div className={"margin-top-02"}>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select"
                                   className="margin-left-35 width-30" id="floorSelect">
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
                            <Input type="textarea" className={"margin-left-35 width-30"} id="incidentComment"
                                   placeholder={"Enter comment here"}/>
                        </FormGroup>
                        <Button onClick={this.handleIncident} className={"margin-left-35"}
                                color={"primary"}>Submit</Button>
                        {' '}
                        <WrappedButton link={"/"} name={"Cancel"} id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddIncident;