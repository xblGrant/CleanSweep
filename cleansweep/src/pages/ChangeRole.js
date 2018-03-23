import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

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
                <Helmet>
                    <title>Change Employee Role</title>
                </Helmet>
                <div className={"margin-top-02"}>
                    <Form>
                        <Label className={"margin-left-35"}><h6>Search By</h6></Label>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="employeeName">Employee Name</Label>
                            <Input
                                placeholder={"Employee name"}
                                type="text" id="employeeName"/>
                        </FormGroup>
                        <Label className={"margin-left-35 width-30"}><h6>or</h6></Label>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="employeeRoleID">Employee ID</Label>
                            <Input
                                placeholder={"Employee ID"}
                                type="text" id="employeeRoleID"/>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="employeeResults">Search Results</Label>
                            <Input
                                placeholder={"Search Results"}
                                type="textarea" id="employeeResults"/>
                        </FormGroup>
                        <FormGroup check>
                            <Label className={"margin-left-35"} check>
                                <Input type="checkbox" id="isManager"/>{' '}
                                Promote to Manager
                            </Label>{' '}
                            <br/>
                            <Label className={"margin-left-35"} check>
                                <Input type="checkbox" id="isEmployee"/>{' '}
                                Demote to Employee
                            </Label>
                        </FormGroup>
                        <br/>
                        <Button onClick={this.handleChangeRole} color={"primary"}
                                className={"margin-left-35"}>Submit</Button>
                        {' '}
                        <WrappedButton  link={routes.HOME} name={"Cancel"} id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddWakeUp;