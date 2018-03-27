import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {CreateFloorOptions} from "../components/Generators";
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import GroupSelect from "../selectable/GroupSelect";
import {Helmet} from "react-helmet";

class AssignRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            employees: [],
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleAssignRooms = this.handleAssignRooms.bind(this);
        this.clearAssignments = this.clearAssignments.bind(this);
    }

    componentDidMount() {
        api.getAllUnassignedSelectableRooms(this);
        api.getAllEmployees(this);
    }

    handleFloorSelect(e) {
        if (e.target.value === '000')
            api.getAllUnassignedSelectableRooms(this);
        else
            api.getAllUnassignedSelectableRoomsByFloor(this, e.target.value);
    }

    handleAssignRooms() {
        api.assignRooms(this);
    }

    clearAssignments() {
        api.clearRoomAssignments(this);
    }

    render() {
        return (
            <div class="container">
                <Helmet>
                    <title>Assign Rooms</title>
                </Helmet>
                    <Form>
                        <FormGroup>
                            <div className={"col-sm-4 center"}>
                                <Label for="floorSelect">Floor</Label>
                                <Input onClick={this.handleFloorSelect} type="select">
                                    <CreateFloorOptions/>
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-10 center"}>
                                <Label className={"center"}>Rooms</Label>
                                <GroupSelect items={this.state.rooms} isDisabled={false}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-10 center"}>
                                <Label className={"center"}>Employees</Label>
                                <GroupSelect items={this.state.employees} isDisabled={false}/>
                            </div>
                        </FormGroup>
                        <br/>
                        <div className={"row"}>
                             <div className={"col-sm-10 center"}>
                                <Button className={"col-sm-3"} onClick={this.handleAssignRooms} color={"primary"}>Assign</Button>
                                <Button className={"col-sm-3"} onClick={this.clearAssignments} color={"secondary"}>Clear Assignments</Button>
                                <Button className={"col-sm-3"} href={routes.HOME} name={"Cancel"}> Cancel </Button>
                             </div>
                        </div>
                    </Form>
            </div>
        );
    }
}

export default AssignRooms;