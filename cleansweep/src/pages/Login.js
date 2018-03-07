import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import NavigationBar from "../components/NavigationBar";
import WrappedButton from "../components/WrappedButton";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin() {
        // handle login here
        this.setState({
            isLoggedIn: true
        });
    }

    handleLogout() {
        // handle logout here
        this.setState({
            isLoggedIn: false
        });
    }

    render() {
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
                            <Input type={"password"} className={"userPass"} id={"userPass"}
                                   placeholder={"Enter password"}/>
                        </FormGroup>
                        <Button onClick={this.handleLogin} color={"primary"} id={"loginBtn"}>Login</Button>
                        {' '}
                        <WrappedButton id={"signUpRedirect"} link={"/signup"} name={"Sign-Up"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;