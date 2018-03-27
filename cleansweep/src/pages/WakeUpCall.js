import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {WrappedButton} from "../components/Buttons";
import {CreateRoomOptions, CreateFloorOptions} from '../components/Generators';
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class AddWakeUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleNewWakeUp = this.handleNewWakeUp.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        api.getListofAllReservableRooms(this);
    }

    handleFloorSelect(e) {
        if (e.target.value === '000')
            api.getListofAllReservableRooms(this);
        else
            api.getListofAllReservableRoomsByFloor(this, e.target.value);
    }

    handleNewWakeUp() {
        //TODO: submit new wake up call
    }

    render() {
        return (
            <div className={"container"}>
                <Helmet>
                    <title>Add Wake-Up Call</title>
                </Helmet>
                <div>
                    <Form>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="floorSelect">Floor</Label>
                                <Input onClick={this.handleFloorSelect} type="select" id="floorSelect">
                                <CreateFloorOptions/>
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="floorSelect">Rooms</Label>
                                <Input id={"roomOptions"} type="select" multiple>
                                    <CreateRoomOptions rooms={this.state.rooms}/>
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="wakeUpDate">Date</Label>
                                <Input type="date" id="wakeUpDate" placeholder={"Email"}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="wakeUpTime">Time</Label>
                                <Input type="time" id="wakeUpTime" placeholder={"Password"}/>
                            </div>
                        </FormGroup>
                        <br/>
                        <div className={"row"}>
                            <div className={"col-sm-6 center"}>
                                <Button className={"col-sm-4"} onClick={this.handleNewWakeUp} color={"primary"}>Submit</Button>
                                <Button className={"col-sm-4"} link={routes.HOME} name={"Cancel"}>Cancel</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddWakeUp;