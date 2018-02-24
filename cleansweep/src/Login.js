// import React from 'react';
// import { InputField } from './Components';
//
// class LoginButton extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleLogin = this.handleLogin.bind(this);
//     }
//
//     handleLogin() {
//         // Handle login here
//     }
//
//     render() {
//         return (
//             <button onClick={this.handleLogin} className="btn btn-default" type="submit">Login</button>
//         );
//     }
// }
//
// function LoginForm() {
//     return (
//         <div>
//         <form>
//             <InputField display={"Username:"} id={"username"}/>
//             <InputField display={"Password:"} id={"userpass"} type={"password"}/>
//             <LoginButton />
//         </form>
//         </div>
//     );
// }
//
// function Login() {
//     return (
//         <div className="App">
//             <h5>Login</h5>
//             <LoginForm />
//         </div>
//     );
// }
//
// export default Login;

import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        // Handle login here
    }

    render() {
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
                    <Button id={"signUpRedirect"}>Sign-Up</Button>
                </Form>
            </div>
        );
    }
}

export default Login;