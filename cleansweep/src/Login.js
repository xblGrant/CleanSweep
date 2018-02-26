import React from 'react';
import SignUp from './Signup';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            signUp: props.signUp
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUpForm = this.handleSignUpForm.bind(this);
    }

    handleLogin() {
        // Handle login here
    }
    handleSignUpForm() {
        this.setState({
            signUp: !this.state.signUp
        });
    }

    render() {
        if (!this.state.signUp) {
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
                        <Button onClick={this.handleSignUpForm} id={"signUpRedirect"}>Sign-Up</Button>
                    </Form>
                </div>
            );
        }

        return(
            <SignUp isCancelled={false}/>
        );
    }
}

export default Login;