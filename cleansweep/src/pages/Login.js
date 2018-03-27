import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { PasswordForgetLink } from "./PasswordForget";
import { SignUpLink } from "./SignUp";
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

const Login = ({ history }) =>
    <div>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div id={"loginForm"}>
            <LoginForm history={history} />
            <SignUpLink />
            <PasswordForgetLink />
        </div>
    </div>;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
       const {
           email,
           password,
       } = this.state;

       const {
           history,
       } = this.props;

       api.login(this, email, password, history);

        e.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <Form onSubmit={this.handleLogin}>
                { error && <p typeof={"error"} className={"error center"} id={"error"}>
                {"Your Email/Password is incorrect. Please retry or click Forgot Password"}</p> }
                <FormGroup>
                    <Label className={"margin-left-35"} for={"userEmail"}>Email</Label>
                    <Input value={email}
                           onChange={e => this.setState(byPropKey('email', e.target.value))}
                           type={"email"} className={"userEmail margin-left-35 width-30"} id={"userEmail"} placeholder={"Enter email"}/>
                </FormGroup>
                <FormGroup>
                    <Label className={"margin-left-35"} for={"userPass"}>Password</Label>
                    <Input value={password}
                           onChange={e => this.setState(byPropKey('password', e.target.value))}
                           type={"password"} className={"userPass margin-left-35 width-30"} id={"userPass"} placeholder={"Enter password"}/>
                </FormGroup>
                <Button type={"submit"} disabled={isInvalid} color={"primary"} className={"margin-left-35"}>Login</Button>

            </Form>
        );
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

export default Login;