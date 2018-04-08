import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";
import * as api from "../firebase/api";

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    userName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class NewEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
        this.handleNewEmployee = this.handleNewEmployee.bind(this);
        this.isManager = this.isManager.bind(this);
    }

    handleNewEmployee(e) {
        const {
            userName,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;
        let isManager = this.state.isManager;
// console.log(isManager);
        if (isManager)
            api.handleNewManager(this, email, passwordOne, userName, history);
        else
            api.handleNewEmployee(this, email, passwordOne, userName, history);

        e.preventDefault();
    }

    isManager() {
        this.setState({
            isManager: !this.state.isManager
        })
    }

    render() {
        const {
            userName,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            this.state.passwordOne !== this.state.passwordTwo ||
            this.state.passwordOne === '' ||
            this.state.email === '' ||
            this.state.userName === '';
        return (
            <div className={"container"}>
                <Helmet>
                    <title>New Employee</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <div id={"newEmployeeForm"}>
                    <Form onSubmit={this.handleNewEmployee}>
                        {error && <p typeof={"error"} className={"error"}>{error.message}</p>}
                        <FormGroup>
                            <Label className={"margin-left-35"} for={"userName"}>Full Name</Label>
                            <Input value={userName}
                                   onChange={e => this.setState(byPropKey('userName', e.target.value))}
                                   className={"margin-left-35 width-30"} id={"userName"} placeholder={"Full Name"}
                                    autoComplete={"name"}/>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"} for={"userEmail"}>Email</Label>
                            <Input value={email}
                                   onChange={e => this.setState(byPropKey('email', e.target.value))}
                                   type={"email"} className={"margin-left-35 width-30"} id={"userEmail"} placeholder={"Enter email"}
                                    autoComplete={"email"}/>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"} for={"userPass"}>Password</Label>
                            <Input value={passwordOne}
                                   onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
                                   type={"password"} className={"margin-left-35 width-30"} id={"userPass"} placeholder={"Enter password"}
                                    autoComplete={"password"}/>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"} for={"confirmUserPass"}>Confirm Password</Label>
                            <Input value={passwordTwo}
                                   onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
                                   type={"password"} className={"margin-left-35 width-30"} id={"confirmUserPass"}
                                   placeholder={"Confirm password"}
                                    autoComplete={"password"}/>
                        </FormGroup>
                        <FormGroup check>
                            <div className={"col-sm-4 center"}>
                                <Label className={"col-sm-4"} check>
                                    <Input onChange={this.isManager} type="checkbox" id="isManager"/>{' '}
                                    Manager
                                </Label>
                            </div>
                        </FormGroup>
                        <div className={"row"}>
                            <div className={"col-sm-5 center"}>
                                <Button className={"col-sm-4 btn"} disabled={isInvalid} onClick={this.handleNewEmployee} color={"primary"}>Add Employee</Button>
                                <Button className={"col-sm-4 btn"} href={routes.HOME}>Cancel</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewEmployee;