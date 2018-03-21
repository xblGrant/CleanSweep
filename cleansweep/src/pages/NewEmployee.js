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
            <div classname={"container"}>
                <head>
                    <title>New Employee</title>
                </head>
                <div id={"newEmployeeForm"}>
                    <Form>
                        <FormGroup row>
                            <div classname={"row"}>
                                <div className={"col-sm-10 center"}>
                                <Label for="employeeFName">First Name</Label>
                                <Input type="text" className={"col-sm-12"} id="employeeFName" placeholder={"First name"}/>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div classname={"row"}>
                                 <div className={"col-sm-10 center"}>
                                <Label for="employeeLName">Last Name</Label>
                                <Input type="text" className={"col-sm-12"} id="employeeLName" placeholder={"Last name"}/>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div classname={"row"}>
                                <div className={"col-sm-10 center"}>
                                <Label for="employeeDOB">Date Of Birth</Label>
                                <Input type="date" className={"col-sm-12"} id="employeeDOB"/>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div classname={"row"}>
                                <div className={"col-sm-10 center"}>
                                <Label for="employeePass">Email</Label>
                                <Input type="email" className={"col-sm-12"} id="employeeEmail" placeholder={"Email"}/>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div classname={"row"}>
                                <div className={"col-sm-10 center"}>
                                <Label for="employeePass">Password</Label>
                                <Input type="password" className={"col-sm-12"} id="employeePass" placeholder={"Password"}/>
                                </div>
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
                        <div classname={"row"}>
                            <div className={"col-sm-4 center"}>
                                <Button className={"col-sm-4"} onClick={this.handleNewEmployee} color={"primary"}>Submit</Button>
                                {' '}
                                <Button className={"col-sm-4"} link={routes.HOME}>Cancel</Button>
                            </div>
                        </div>
                </Form>
                </div>
            </div>
        );
    }
}

export default NewEmployee;