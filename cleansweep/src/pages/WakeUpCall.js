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
            <div>
                <Helmet>
                    <title>Add Wake-Up Call</title>
                </Helmet>
                <div>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" className="margin-left-35 width-30"
                                   id="floorSelect">
                                <CreateFloorOptions/>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="floorSelect">Rooms</Label>
                            <Input className={"margin-left-35 width-30"} id={"roomOptions"} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="wakeUpDate">Date</Label>
                            <Input className={"margin-left-35 width-30"} type="date" id="wakeUpDate"
                                   placeholder={"Email"}/>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="wakeUpTime">Time</Label>
                            <Input className={"margin-left-35 width-30"} type="time" id="wakeUpTime"
                                   placeholder={"Password"}/>
                        </FormGroup>
                        <Button onClick={this.handleNewWakeUp} color={"primary"}
                                className={"margin-left-35"}>Submit</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"} id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddWakeUp;