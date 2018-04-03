import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

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
                <Helmet>
                    <title>New Employee</title>
                    <body className={"background-to-bottom"}></body>
                </Helmet>
                <div id={"newEmployeeForm"}>
                    <Form>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="employeeFName">First Name</Label>
                                <Input type="text" className={"center"} id="employeeFName" placeholder={"First name"} autoComplete={"given-name"}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="employeeLName">Last Name</Label>
                                <Input type="text" className={"center"} id="employeeLName" placeholder={"Last name"} autoComplete={"family-name"}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="employeeDOB">Date Of Birth</Label>
                                <Input type="date" className={"center"} id="employeeDOB" autoComplete={"dob"}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="employeePass">Email</Label>
                                <Input type="email" className={"center"} id="employeeEmail" placeholder={"Email"} autoComplete={"email"}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="employeePass">Password</Label>
                                <Input type="password" className={"center"} id="employeePass" placeholder={"Password"} autoComplete={"current-password"}/>
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
                        <FormGroup>
                        <div className={"row"}>
                            <div className={"col-sm-5 center"}>
                                <Button className={"col-sm-4 btn"} onClick={this.handleNewEmployee} color={"primary"}>Add Employee</Button>
                                <Button className={"col-sm-4 btn"} href={routes.HOME}>Cancel</Button>
                            </div>
                        </div>
                        </FormGroup>
                </Form>
                </div>
            </div>
        );
    }
}

export default NewEmployee;