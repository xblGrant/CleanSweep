import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';
import NavigationBar from './NavigationBar';

class NewEmployee extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Form>
                    <FormGroup row>
                        <Label for="employeeFName">First Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="textarea" id="employeeFName"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="employeeLName">Last Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="textarea" id="employeeLName"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exmployeeDOB">Date Of Birth</Label>
                        <Col sm={10}>
                            <Input type="date" name="date" id="exmployeeDOB"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="employeePass">Password</Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="employeePass"/>
                        </Col>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="checkbox" id="isManager"/>{' '}
                            Manager
                        </Label>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default NewEmployee;