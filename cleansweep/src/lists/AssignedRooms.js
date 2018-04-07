import React from 'react';
import {Form, Label, FormGroup, Input} from 'reactstrap';
import {CreateFloorOptions} from "../components/Generators";
import GroupSelect from '../selectable/GroupSelect';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class AssignedRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        api.getAssignedRooms(this);
    }

    handleFloorSelect(e) {
        let floor = e.target.value;
        if (floor === '000') {
            api.getAssignedRooms(this);
        } else {
            api.getAssignedRoomsByFloor(this, floor);
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Assigned Rooms</title>
                    <body className={"background-to-bottom"}/>
                </Helmet>
                <div id={"loadRooms"}>
                    <Form>
                        <FormGroup>
                            <div className={"col-sm-4 center"}>
                                <Label for="floorSelect">Floor</Label>
                                <Input onClick={this.handleFloorSelect} type="select" id="floorSelect">
                                    <CreateFloorOptions/>
                                </Input>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <div className={"container text-center"}>
                                <Label className={"center"}>Assigned Rooms</Label>
                            </div>
                            <GroupSelect items={this.state.rooms}/>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AssignedRooms;