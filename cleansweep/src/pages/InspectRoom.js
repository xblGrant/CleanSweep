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
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class InspectRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
        };

        this.handleInspect = this.handleInspect.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        api.getListofAllRoomsNeedInspected(this);
    }

    handleFloorSelect(e) {
        if (e.target.value === '000')
            api.getListofAllRoomsNeedInspected(this);
        else
            api.getListofAllRoomsNeedInspectedByFloor(this, e.target.value);
    }

    handleInspect() {
        // TODO: implement
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Inspect Room</title>
                </Helmet>
                <div className={"margin-top-02"}>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" className="margin-left-35 width-30" id="floorSelect">
                                <CreateFloorOptions />
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="assignableRoom">Rooms</Label>
                            <Input className={"margin-left-35 width-30"} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="inspectComment">Comment</Label>
                            <Input type="textarea" className={"margin-left-35 width-30"} placeholder={"Enter comment here"}/>
                        </FormGroup>
                        <Button onClick={this.handleInspect} color={"primary"} className={"margin-left-35"}>Submit</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"} id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default InspectRoom;