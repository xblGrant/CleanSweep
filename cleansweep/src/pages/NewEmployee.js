import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
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
                            <Label className={"margin-left-35"} for="employeeFName">First Name</Label>
                            <Input type="text" className={"margin-left-35 width-30"} id="employeeFName" placeholder={"First name"}/>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="employeeLName">Last Name</Label>
                            <Input type="text" className={"margin-left-35 width-30"} id="employeeLName" placeholder={"Last name"}/>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="employeeDOB">Date Of Birth</Label>
                            <Input type="date" className={"margin-left-35 width-30"} id="employeeDOB"/>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="employeePass">Email</Label>
                            <Input type="email" className={"margin-left-35 width-30"} id="employeeEmail" placeholder={"Email"}/>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="employeePass">Password</Label>
                            <Input type="password" className={"margin-left-35 width-30"} id="employeePass" placeholder={"Password"}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label className={"margin-left-35"} check>
                                <Input type="checkbox" id="isManager"/>{' '}
                                Manager
                            </Label>
                        </FormGroup>
                        <br/>
                        <Button onClick={this.handleNewEmployee} color={"primary"}
                                className={"margin-left-35"}>Submit</Button>
                        {' '}
                        <WrappedButton className={"margin-left-35"} link={routes.HOME} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewEmployee;