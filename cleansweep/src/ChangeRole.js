import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class AddWakeUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeRole = this.handleChangeRole.bind(this);
    }

    handleChangeRole() {
        //TODO: handle changing of employee role
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
                        <FormGroup check>
                            <Label id={"checkbox"} check>
                                <Input type="checkbox" id="isManager"/>{' '}
                                Promote to Manager
                            </Label>{' '}
                            <br/>
                            <Label id={"checkbox"} check>
                                <Input type="checkbox" id="isEmployee"/>{' '}
                                Demote to Employee
                            </Label>
                        </FormGroup>
                        <br/>
                        <Button onClick={this.handleChangeRole} color={"primary"}
                                id={"submitChangeRoleBtn"}>Submit</Button>
                        {' '}
                        <WrappedButton id={"changeRoleCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddWakeUp;