import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {CreateFloorOptions, CreateEmployeeOptions} from "../components/Generators";
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
            selectedRooms: null,
            selectedEmployee: null,
            selectedFloor: '000',
            submitted: false
        };

        this.isSubmitted = this.isSubmitted.bind(this);
        this.updateRooms = this.updateRooms.bind(this);
        this.handleSelectionFinish = this.handleSelectionFinish.bind(this);
        this.handleSelectionClear = this.handleSelectionClear.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleAssignRooms = this.handleAssignRooms.bind(this);
        this.clearAssignments = this.clearAssignments.bind(this);
        this.handleEmployeeSelect = this.handleEmployeeSelect.bind(this);
    }

    componentDidMount() {
        api.getAllUnassignedSelectableRooms(this);
        api.getAllEmployees(this);
    }

    isSubmitted(val) {
        this.setState({submitted: val});
    }

    handleFloorSelect(e) {
        if (e.target.value === '000')
            api.getAllUnassignedSelectableRooms(this);
        else
            api.getAllUnassignedSelectableRoomsByFloor(this, e.target.value);

        this.setState({ selectedFloor: e.target.value });
        this.isSubmitted(false);
    }

    handleEmployeeSelect(e) {
        let employee = e.target.value;
        if (employee === '') {employee = null}
        this.setState({
            selectedEmployee: employee
        });
        this.isSubmitted(false);
    }

    handleSelectionFinish = selectedItems => {
        let selectedRooms = [];
        for (let i = 0; i < selectedItems.length; i++)
            selectedRooms[i] = selectedItems[i].props;

        this.setState({ selectedRooms: selectedRooms});
        this.isSubmitted(false);
    };

    handleSelectionClear() {
        this.setState({ selectedRooms: null });
        this.isSubmitted(false);
    }

    handleAssignRooms() {
        let {selectedRooms, selectedEmployee} = this.state;
        for (let i = 0; i < selectedRooms.length; i++)
            api.assignRoom(selectedRooms[i], selectedEmployee);
        this.updateRooms(this.state.selectedFloor);
        this.isSubmitted(true);
    }

    updateRooms(floor) {
        if (floor === '000')
            api.getAllUnassignedSelectableRooms(this);
        else
            api.getAllUnassignedSelectableRoomsByFloor(this, floor);
    }

    clearAssignments() {
        api.clearRoomAssignments(this);
        this.isSubmitted(false);
    }

    render() {

        const isDisabled =
            this.state.selectedEmployee === null ||
            this.state.selectedRooms === null;

        return (
            <div className="container">
                <Helmet>
                    <title>Assign Rooms</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <Form>
                    <FormGroup>
                        <div className={"col-sm-4 center"}>
                            <Label for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} id={'floorSelect'} type="select">
                                <CreateFloorOptions/>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup row>
                        <div className={"col-sm-10 center"}>
                            <Label className={"center"}>Employees</Label>
                            <Input onClick={this.handleEmployeeSelect} id={'employeeSelect'} type="select">
                                <CreateEmployeeOptions employees={this.state.employees}/>
                            </Input>
                        </div>
                    </FormGroup>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-10 center"}>
                            <Button disabled={isDisabled} className={"col-sm-3"} onClick={this.handleAssignRooms}
                                    color={"primary"}>Assign</Button>
                            <Button className={"col-sm-3"} onClick={this.clearAssignments} color={"secondary"}>Clear
                                Assignments</Button>
                            <Button className={"col-sm-3"} href={routes.HOME} name={"Cancel"}> Cancel </Button>
                        </div>
                    </div>
                    {this.state.submitted && <p className={"submission"} id={"submitMessage"}>
                        {"Rooms assigned successfully"}</p>}
                    <FormGroup row>
                        <div className={"col-sm-10 center"}>
                            <Label className={"center"}>Rooms</Label>
                            <GroupSelect items={this.state.rooms}
                                         onSelectionFinish={this.handleSelectionFinish}
                                         onSelectionClear={this.handleSelectionClear}
                                         isDisabled={false}/>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default AssignRooms;