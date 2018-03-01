import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class AddWakeUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleAssignRooms = this.handleAssignRooms.bind(this);
    }

    handleAssignRooms() {
        //TODO: submit new wake up call
    }

    render() {
        return (
            <div>
                <head>
                    <title>Change Employee Role</title>
                </head>
                <div id={"changeRoleForm"}>
                    <NavigationBar/>
                    <Form>
                        <Label id={"searchLabel"}><h6>Search By:</h6></Label>
                            <FormGroup row>
                                <Label id={"label"} for="employeeName">Employee Name</Label>
                                <Input
                                    placeholder={"Employee name"}
                                    type="text" id="employeeName"/>
                            </FormGroup>
                        <Label id={"orLabel"}><h6>or</h6></Label>
                            <FormGroup row>
                                <Label id={"label"} for="employeeRoleID">Employee ID</Label>
                                <Input
                                    placeholder={"Employee ID"}
                                    type="text" id="employeeRoleID"/>
                            </FormGroup>
                            <FormGroup row>
                                <Label id={"label"} for="employeeResults">Search Results</Label>
                                <Input
                                    placeholder={"Search Results"}
                                    type="textarea" id="employeeResults"/>
                            </FormGroup>
                        <Button onClick={this.handleAssignRooms} color={"primary"}
                                id={"submitAssignRoomsBtn"}>Submit</Button>
                        {' '}
                        <WrappedButton id={"newWakeUpCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddWakeUp;