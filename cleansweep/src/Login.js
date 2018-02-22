import React from 'react';
import { InputField } from './Components';

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        // Handle login here
    }

    render() {
        return (
            <div className="row">
                <div className="twelve columns">
                    <button onClick={this.handleLogin} className="btn btn-default" type="submit">Login</button>
                </div>
            </div>
        );
    }
}

function LoginForm() {
    return (
        <form>
            <InputField display={"Username:"} id={"username"}/>
            <InputField display={"Password:"} id={"userpass"} type={"password"}/>
            <LoginButton />
        </form>
    );
}

function Login() {
    return (
        <div className="App">
            <head>
                <title>Clean Sweep</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>
            <h2>Login Page</h2>
            <div className="container">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;