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
            <div>
                <head>
                    <title>New Employee</title>
                </head>
                <div id={"newEmployeeForm"}>
                    <Form>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                            <Label className={"col-sm-4"} for="employeeFName">First Name</Label>
                            <Input type="text" className={"col-sm-10 center"} id="employeeFName" placeholder={"First name"}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                            <Label className={"col-sm-4"} for="employeeLName">Last Name</Label>
                            <Input type="text" className={"col-sm-10 center"} id="employeeLName" placeholder={"Last name"}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                            <Label className={"col-sm-4"} for="employeeDOB">Date Of Birth</Label>
                            <Input type="date" className={"col-sm-10 center"} id="employeeDOB"/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                            <Label className={"col-sm-4"} for="employeePass">Email</Label>
                            <Input type="email" className={"col-sm-10 center"} id="employeeEmail" placeholder={"Email"}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                            <Label className={"col-sm-4"} for="employeePass">Password</Label>
                            <Input type="password" className={"col-sm-10 center"} id="employeePass" placeholder={"Password"}/>
                            </div>
                        </FormGroup>
                        <FormGroup check>
                            <div className={"col-sm-4 center"}>
                            <Label className={"col-sm-4"} check>
                                <Input type="checkbox" id="isManager"/>{' '}
                                Manager
                            </Label>
                            </div>
                        </FormGroup>
                        <br/>
                        <div className={"col-sm-4 center"}>
                            <Button className={"col-sm-4"} onClick={this.handleNewEmployee} color={"primary"}>Submit</Button>
                            {' '}
                            <Button className={"col-sm-4"} link={routes.HOME}>Cancel</Button>
                        </div>
                </Form>
                </div>
            </div>
        );
    }
}

export default NewEmployee;