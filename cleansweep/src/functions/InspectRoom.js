import React from 'react';
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
            <div className="container">
                <Helmet>
                    <title>Inspect Room</title>
                </Helmet>
                <Form>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            <Label for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" id="floorSelect">
                                <CreateFloorOptions />
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            <Label for="assignableRoom">Rooms</Label>
                            <Input type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            <Label for="inspectComment">Comment</Label>
                            <Input type="textarea" placeholder={"Enter comment here"}/>
                        </div>
                    </FormGroup>

                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-5 center"}>
                            <Button className={"col-sm-4"}onClick={this.handleInspect} color={"primary"}>Submit</Button>
                            <Button className={"col-sm-4"} href={routes.HOME}> Cancel </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default InspectRoom;