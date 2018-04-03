import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
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
            <div className={"container"}>
                <Helmet>
                    <title>Change Employee Role</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <Form>
                    <h6 className={"text-center"}>Search By</h6>
                    <div className={"row"}>
                        <div className={"col-sm-6"}>
                            <FormGroup>
                                <div className={"col-sm-11 center"}>
                                    <Label for="employeeName">Employee Name</Label>
                                    <Input placeholder={"Employee name"} type="text" id="employeeName" autoComplete={"name"}/>
                                </div>
                            </FormGroup>
                        </div>
                        <div className={"col-sm-6"}>
                            <FormGroup>
                                <div className={"col-sm-11 center"}>
                                    <Label for="employeeRoleID">Employee ID</Label>
                                    <Input placeholder={"Employee ID"} type="text" id="employeeRoleID"/>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className={"col-sm-11 center"}>
                                    <Label for="employeeResults">Search Results</Label>
                                    <Input placeholder={"Search Results"} type="textarea" id="employeeResults"/>
                                </div>
                            </FormGroup>

                        </div>
                    </div>
                    <hr/>
                    <FormGroup check>
                        <div className={"center"}>
                            <Label check>
                                <Input type="checkbox" id="isManager"/>
                                Promote to Manager
                            </Label>
                            <br/>
                            <Label check>
                                <Input type="checkbox" id="isEmployee"/>
                                Demote to Employee
                            </Label>
                        </div>
                    </FormGroup>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-6 center"}>
                            <Button className={"col-sm-5 center"} onClick={this.handleChangeRole} color={"primary"}>Submit</Button>
                            <Button className={"col-sm-5 center"} href={routes.HOME}> Cancel </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default AddWakeUp;