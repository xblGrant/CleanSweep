import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { PasswordForgetLink } from "./PasswordForget";
import { SignUpLink } from "./SignUp";
import {auth} from "../firebase/index";

import * as routes from '../constants/routes';

const Login = ({ history }) =>
    <div>
        <head>
            <title>Login</title>
        </head>
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

       auth.doSignInWithEmailAndPassword(email, password)
           .then(() => {
               this.setState(() => ({...INITIAL_STATE}));
               history.push(routes.LANDING);  //TODO: redirect to a better page than the same page
           })
           .catch(error => {
               this.setState(byPropKey('error', error));
           });

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
                <FormGroup>
                    <Label id={"label"} for={"userEmail"}>Email</Label>
                    <Input value={email}
                           onChange={e => this.setState(byPropKey('email', e.target.value))}
                           type={"email"} className={"userEmail"} id={"userEmail"} placeholder={"Enter email"}/>
                </FormGroup>
                <FormGroup>
                    <Label id={"label"} for={"userPass"}>Password</Label>
                    <Input value={password}
                           onChange={e => this.setState(byPropKey('password', e.target.value))}
                           type={"password"} className={"userPass"} id={"userPass"} placeholder={"Enter password"}/>
                </FormGroup>
                <Button type={"submit"} disabled={isInvalid} color={"primary"} id={"loginBtn"}>Login</Button>
                { error && <p>{error.message}</p> }
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