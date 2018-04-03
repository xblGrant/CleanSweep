import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

const byPropKey = (propName, value) => () => ({
    [propName]: value,
});

const INITIAL_STATE = {
    passwordOld: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChange extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit(e){
        const {passwordOne} = this.state;
        api.passwordUpdate(this, passwordOne);
        e.preventDefault();
    }

    render() {
        const {
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';

        return (
            <div className={"container"}>
                <Helmet>
                    <title>Change Password</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <h3 className={"center"}> Password Change</h3>
                <br/>
                <Form onSubmit={this.onSubmit}>
                    {error && <p typeof={"error"} className={"error"}>{error.message}</p>}
                    <FormGroup>
                        <Input  className={"col-sm-6 center"}
                                id={"pwChangeNew"}
                                value={passwordOne}
                                onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
                                type={"password"}
                                placeholder={"New Password"}
                                autoComplete={"new-password"}/>
                    </FormGroup>
                    <FormGroup>
                        <Input  className={"col-sm-6 center"}
                                id={"pwChangeConfirm"}
                                value={passwordTwo}
                                onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
                                type={"password"}
                                placeholder={"Confirm New Password"}
                                autoComplete={"new-password"}/>
                    </FormGroup>
                    <div className={"center"}>
                        <Button className={"col-sm-4 center"}
                                id={"changePwBtn"}
                                disabled={isInvalid}
                                color={"primary"}
                                type={"submit"}>
                            Reset Password
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default PasswordChange;