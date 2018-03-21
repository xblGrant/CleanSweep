import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as routes from "../constants/routes";

class NewEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewEmployee = this.handleNewEmployee.bind(this);
    }

    handleNewEmployee() {
        //TODO: check for empty components
        //TODO: submit new employee in database
    }

    render() {
        return (
            <div className={"container"}>
                <head>
                    <title>New Employee</title>
                </head>
                <div className={"row"}>
                    <div className={"col-sm-4"}>
                    </div>

                    <div className={"col-sm-4"} id={"newEmployeeForm"}>
                        <Form>
                            <FormGroup row>
                                <Label for="employeeFName">First Name</Label>
                                <Input type="text" id="employeeFName" placeholder={"First name"}/>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="employeeLName">Last Name</Label>
                                <Input type="text" id="employeeLName" placeholder={"Last name"}/>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="employeeDOB">Date Of Birth</Label>
                                <Input type="date" id="employeeDOB"/>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="employeePass">Email</Label>
                                <Input type="email" id="employeeEmail" placeholder={"Email"}/>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="employeePass">Password</Label>
                                <Input type="password" id="employeePass" placeholder={"Password"}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="isManager"/>{' '}
                                    Manager
                                </Label>
                            </FormGroup>
                            <br/>
                            <div className={"row"}>
                                <Button className={"col"} onClick={this.handleNewEmployee} color={"primary"}>Submit</Button>
                                <Button className={"col"} link={routes.HOME}>Cancel</Button>
                            </div>
                        </Form>
                    </div>

                    <div className={"col-sm-4"}>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewEmployee;