import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {CreateEmployeeOptions} from "../components/Generators";
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class AddWakeUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        };

        this.handleChangeRole = this.handleChangeRole.bind(this);
    }

    componentDidMount() {
        api.getAllEmployees(this);
    }

    handleChangeRole() {
        //TODO: handle changing of employee role
    }

    render() {
        return (
            <div className={"container"}>
                <Helmet>
                    <title>Change Employee Role</title>
                    <body className={"background-to-bottom"}/>
                </Helmet>
                <Form>
                    <h6 className={"text-center"}>Search By</h6>
                    <div className={"center"}>
                        <FormGroup row>
                            <div className={"col-sm-10 center"}>
                                <Label className={"center"}>Employees</Label>
                                <Input onClick={this.handleEmployeeSelect} id={'employeeSelect'} type="select">
                                    <CreateEmployeeOptions employees={this.state.employees}/>
                                </Input>
                            </div>
                        </FormGroup>
                    </div>
                    <hr/>
                    <div className={"center"} onChange={{/*this.handlePromotionDemotion*/}}>
                        <input type={"radio"} name={"career"} value={"promote"}/> Promote to Manager<br/>
                        <input type={"radio"} name={"career"} value={"demote"}/> Demote to Employee<br/>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-6 center"}>
                            <Button className={"col-sm-5 center"} onClick={this.handleChangeRole}
                                    color={"primary"}>Submit</Button>
                            <Button className={"col-sm-5 center"} href={routes.HOME}> Cancel </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default AddWakeUp;