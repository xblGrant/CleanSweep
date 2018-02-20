import React from 'react';
import PropTypes from 'prop-types';


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

function InputField(props) {
    InputField.defaultProps = {
        display: "Input: ",
        type: "text"
    };

    return (
        <div className="row">
            <div className="four columns">
                <label>{props.display}</label>
            </div>
            <div className="eight columns">
                <input name={props.id} id={props.id} type={props.type}/>
            </div>
        </div>
    );
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

InputField.propTypes = {
    display: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default Login;