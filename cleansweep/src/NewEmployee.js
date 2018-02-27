import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class NewEmployee extends React.Component {
    constructor(props){
        super(props);

        this.handleNewEmployee = this.handleNewEmployee.bind(this);
    }

    handleNewEmployee() {

    }

    render() {
        return (
            <div id={"newEmployeeForm"}>
                <NavigationBar/>
                <Form>
                    <FormGroup row>
                        <Label id={"label"} for="employeeFName">First Name</Label>
                        <Input type="text" id="employeeFName" placeholder={"First name"}/>
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="employeeLName">Last Name</Label>
                        <Input type="text" id="employeeLName" placeholder={"Last name"}/>
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="employeeDOB">Date Of Birth</Label>
                        <Input type="date" id="employeeDOB" />
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="employeePass">Email</Label>
                        <Input type="email" id="employeeEmail" placeholder={"Email"}/>
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="employeePass">Password</Label>
                        <Input type="password" id="employeePass" placeholder={"Password"}/>
                    </FormGroup>
                    <FormGroup check>
                        <Label id={"label"} check>
                            <Input type="checkbox" id="isManager"/>{' '}
                            Manager
                        </Label>
                    </FormGroup>
                    <br/>
                    <Button onClick={this.handleNewEmployee} color={"primary"} id={"submitNewEmpBtn"}>Submit</Button>
                    {' '}
                    <WrappedButton id={"newEmpCancel"} link={"/"} name={"Cancel"}/>
                </Form>
            </div>
        );
    }
}

export default NewEmployee;