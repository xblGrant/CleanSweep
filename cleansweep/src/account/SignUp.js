import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import * as api from '../firebase/api';
import {withRouter} from 'react-router-dom';
import {Helmet} from "react-helmet";
import * as routes from "../constants/routes";

const SignUp = ({history}) =>
    <div>
        <Helmet>
            <title>Sign-Up</title>
            <body className={"background-to-bottom"}/>
        </Helmet>


        <div>
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

    componentWillMount() {
        if (api.getCurrentUser() !== null){
            this.props.history.push(routes.ASSIGNED_ROOMS);
        }
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

        api.signUp(this, email, passwordOne, userName, history);

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
                {error && <p typeof={"error"} className={"error col-sm-4 center"}>{error.message}</p>}
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
    <p className={"center"}>
        <Link to={"/signup"}>Sign Up</Link>
    </p>;

export default withRouter(SignUp);
export {SignUp, SignUpLink};