import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import NavigationBar from "./NavigationBar";
import WrappedButton from "./Components";


function Login(props) {
    return (
        <div>
            <head>
                <title>Login</title>
            </head>
            <div id={"loginForm"}>
                <NavigationBar/>
                <Form>
                    <FormGroup>
                        <Label id={"label"} for={"userEmail"}>Email</Label>
                        <Input type={"email"} className={"userEmail"} id={"userEmail"} placeholder={"Enter email"}/>
                    </FormGroup>
                    <FormGroup>
                        <Label id={"label"} for={"userPass"}>Password</Label>
                        <Input type={"password"} className={"userPass"} id={"userPass"} placeholder={"Enter password"}/>
                    </FormGroup>
                    <Button onClick={props.handleLogin} color={"primary"} id={"loginBtn"}>Login</Button>
                    {' '}
                    <WrappedButton id={"signUpRedirect"} link={"/signup"} name={"Sign-Up"}/>
                </Form>
            </div>
        </div>
    );
}

export default Login;