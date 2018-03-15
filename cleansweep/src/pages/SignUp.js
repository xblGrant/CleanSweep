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
    firstName: '',
    lastName: '',
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
            firstName,
            lastName,
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
                        username: firstName + " " + lastName,
                        email: email
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
            firstName,
            lastName,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            this.state.passwordOne !== this.state.passwordTwo ||
            this.state.passwordOne === '' ||
            this.state.email === '' ||
            this.state.firstName === '' ||
            this.state.lastName === '';

        return (
            <Form onSubmit={this.handleSignUp}>
                <FormGroup>
                    <Label id={"label"} for={"firstName"}>First Name</Label>
                    <Input value={firstName}
                           onChange={e => this.setState(byPropKey('firstName', e.target.value))}
                           className={"firstName"} id={"firstName"} placeholder={"First Name"}/>
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label id={"label"} for={"lastName"}>Last Name</Label>
                    <Input value={lastName}
                           onChange={e => this.setState(byPropKey('lastName', e.target.value))}
                           className={"lastName"} id={"lastName"} placeholder={"Last Name"}/>
                </FormGroup>
                <FormGroup>
                    <Label id={"label"} for={"userEmail"}>Email</Label>
                    <Input value={email}
                           onChange={e => this.setState(byPropKey('email', e.target.value))}
                           type={"email"} className={"userEmail"} id={"userEmail"} placeholder={"Enter email"}/>
                </FormGroup>
                <FormGroup>
                    <Label id={"label"} for={"userPass"}>Password</Label>
                    <Input value={passwordOne}
                           onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
                           type={"password"} className={"userPass"} id={"userPass"} placeholder={"Enter password"}/>
                </FormGroup>
                <FormGroup>
                    <Label id={"label"} for={"confirmUserPass"}>Confirm Password</Label>
                    <Input value={passwordTwo}
                           onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
                           type={"password"} className={"confirmUserPass"} id={"confirmUserPass"}
                           placeholder={"Confirm password"}/>
                </FormGroup>
                <Button disabled={isInvalid} type={"submit"} color={"primary"} id={"signUpBtn"}>Sign-Up</Button>
                {error && <p>{error.message}</p>}
            </Form>
        )
    }
}

const SignUpLink = () =>
    <p id={"signUpLink"}>
        <Link to={"/signup"}>Sign Up</Link>
    </p>;

export default withRouter(SignUp);
export {SignUp, SignUpLink};