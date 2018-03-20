import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {auth, firebase} from "../firebase/index";
import {withRouter} from 'react-router-dom';

import * as routes from '../constants/routes';

const SignUp = ({history}) =>
    <div>
        <head>
            <title>Sign-Up</title>
        </head>
        <div id={"signUpForm"}>
            <SignUpForm history={history}/>
        </div>
    </div>;

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    userName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(e) {
        const {
            userName,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(() => {
                let employeeRef = firebase.db.ref("/Employee/");
                employeeRef.child(firebase.auth.currentUser.uid)
                    .set({
                        username: userName,
                        email: email,
                        isAdmin: false
                    });

                this.setState(() => ({...INITIAL_STATE}));
                history.push(routes.ASSIGNED_ROOMS); //TODO: push to proper page for after signup/login
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        e.preventDefault();
    }

    render() {

        const {
            userName,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            this.state.passwordOne !== this.state.passwordTwo ||
            this.state.passwordOne === '' ||
            this.state.email === '' ||
            this.state.userName === '';

        return (
            <Form onSubmit={this.handleSignUp}>
                {error && <p type={"error"} className={"error"}>{error.message}</p>}
                <FormGroup>
                    <Label className={"margin-left-35"} for={"userName"}>Full Name</Label>
                    <Input value={userName}
                           onChange={e => this.setState(byPropKey('userName', e.target.value))}
                           className={"margin-left-35 width-30"} id={"userName"} placeholder={"Full Name"}/>
                </FormGroup>
                <FormGroup>
                    <Label className={"margin-left-35"} for={"userEmail"}>Email</Label>
                    <Input value={email}
                           onChange={e => this.setState(byPropKey('email', e.target.value))}
                           type={"email"} className={"margin-left-35 width-30"} id={"userEmail"} placeholder={"Enter email"}/>
                </FormGroup>
                <FormGroup>
                    <Label className={"margin-left-35"} for={"userPass"}>Password</Label>
                    <Input value={passwordOne}
                           onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
                           type={"password"} className={"margin-left-35 width-30"} id={"userPass"} placeholder={"Enter password"}/>
                </FormGroup>
                <FormGroup>
                    <Label className={"margin-left-35"} for={"confirmUserPass"}>Confirm Password</Label>
                    <Input value={passwordTwo}
                           onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
                           type={"password"} className={"margin-left-35 width-30"} id={"confirmUserPass"}
                           placeholder={"Confirm password"}/>
                </FormGroup>
                <Button disabled={isInvalid} type={"submit"} color={"primary"} className={"margin-left-35"}>Sign-Up</Button>
            </Form>
        )
    }
}

const SignUpLink = () =>
    <p className={"margin-left-35"}>
        <Link to={"/signup"}>Sign Up</Link>
    </p>;

export default withRouter(SignUp);
export {SignUp, SignUpLink};