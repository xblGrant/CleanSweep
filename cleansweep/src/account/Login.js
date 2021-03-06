import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { PasswordForgetLink } from "./PasswordForget";
import { SignUpLink } from "./SignUp";
import * as api from '../firebase/api';
import * as routes from '../constants/routes';
import {Helmet} from "react-helmet";

const Login = ({ history }) =>
    <div>
        <Helmet>
            <title>Login</title>
            <body className={"background-to-bottom"}/>
        </Helmet>
        <div>
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

    componentWillMount() {
        if (api.getCurrentUser() !== null){
            this.props.history.push(routes.ASSIGNED_ROOMS);
        }
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
            <div className="container">
                <div className={"center col-sm-6"}>
                    <Form onSubmit={this.handleLogin}>
                        { error && <p typeof={"error"} className={"error col-sm-4 center"} id={"error"}>
                        {"Your Email/Password is incorrect. Please retry or click Forgot Password"}</p> }
                        <FormGroup>
                            <Label for={"userEmail"}>Email</Label>
                            <Input value={email}
                                   onChange={e => this.setState(byPropKey('email', e.target.value))}
                                   type={"email"} id={"userEmail"} placeholder={"Enter email"}
                                    autoComplete={"email"}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={"userPass"}>Password</Label>
                            <Input value={password}
                                   onChange={e => this.setState(byPropKey('password', e.target.value))}
                                   type={"password"} id={"userPass"} placeholder={"Enter password"}
                                    autoComplete={"current-password"}/>
                        </FormGroup>
                        <br/>
                        <Button className={"col-sm-4"} type={"submit"} disabled={isInvalid} color={"primary"}>Login</Button>
                    </Form>
                </div>
            </div>
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