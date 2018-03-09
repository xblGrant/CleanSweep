import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
import { auth } from "../firebase/index";
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

const SignUp = ({ history }) =>
    <div>
        <head>
            <title>Sign-Up</title>
        </head>
        <div id={"signUpForm"}>
            <SignUpForm history={history} />
        </div>
    </div>;

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(e) {
        const {
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push(routes.LANDING); //TODO: push to proper page for after signup/login
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        e.preventDefault();
    }

    render() {

        const {
            name,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            this.state.passwordOne !== this.state.passwordTwo ||
            this.state.passwordOne === '' ||
            this.state.email === '' ||
            this.state.name === '';
        // this.state.firstName === '' ||
        // this.state.lastName === '';

        return (
            <Form onSubmit={this.handleSignUp}>
                <FormGroup>
                    <Label id={"label"} for={"firstName"}>First Name</Label>
                    <Input value={name}
                           onChange={e => this.setState(byPropKey('name', e.target.value))}
                           className={"firstName"} id={"firstName"} placeholder={"First Name"}/>
                </FormGroup>
                {' '}
                {/*<FormGroup>*/}
                {/*<Label id={"label"} for={"lastName"}>Last Name</Label>*/}
                {/*<Input value={this.state.lastName}*/}
                {/*onChange={e => this.setState({ lastName: e.target.value })}*/}
                {/*className={"lastName"} id={"lastName"} placeholder={"Last Name"}/>*/}
                {/*</FormGroup>*/}
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
                {' '}
                <WrappedButton id={"signUpCancel"} link={"/"} name={"Cancel"}/>
                { error && <p>{error.message}</p>}
            </Form>
        )
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    username: '',
    name: '', // TODO: Remove name for first name and last name fields
    // firstName: '',
    // lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

export default withRouter(SignUp);
export { SignUp };