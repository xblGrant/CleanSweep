import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


function Login(props) {
    return (
        <div id={"loginForm"}>
            <Form>
                <FormGroup>
                    <Label id={"label"} for={"userEmail"}>Email</Label>
                    <Input type={"email"} className={"userEmail"} id={"userEmail"} placeholder={"Enter email"}/>
                </FormGroup>
                <FormGroup>
                    <Label id={"label"} for={"userPass"}>Password</Label>
                    <Input type={"password"} className={"userPass"} id={"userPass"} placeholder={"Enter password"}/>
                </FormGroup>
                <Button color={"primary"} id={"loginBtn"}>Login</Button>
                {' '}
                <Button onClick={props.handleSignUpPage} id={"signUpRedirect"}>Sign-Up</Button>
            </Form>
        </div>
    );
}

export default Login;