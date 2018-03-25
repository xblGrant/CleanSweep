import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {WrappedButton} from "../components/Buttons";
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
            <div>
                <Helmet>
                    <title>Assign Rooms</title>
                </Helmet>
                <div className={"margin-top-02"}>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" className="margin-left-35 width-30">
                                <CreateFloorOptions/>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"center"}>
                                <div className={"container text-center"}>
                                    <Label className={"center"}>Rooms</Label>
                                </div>
                                <GroupSelect items={this.state.rooms} isDisabled={false}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"center"}>
                                <div className={"container text-center"}>
                                    <Label className={"center"}>Employees</Label>
                                </div>
                                <GroupSelect items={this.state.employees} isDisabled={false}/>
                            </div>
                        </FormGroup>
                        <Button onClick={this.handleAssignRooms} color={"primary"}
                                className={"margin-left-35"}>Assign</Button>
                        {' '}
                        <Button onClick={this.clearAssignments} color={"secondary"}>
                            Clear Assignments</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"} id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AssignRooms;