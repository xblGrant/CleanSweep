import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Signup extends React.Component{
    constructor(props) {
        super(props);

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSignUp() {
        // Handle sign up here
    }

    render() {
        return (
            <div id={"signUpForm"}>
                <Form>
                    <div id={"signUpName"}>
                        <Form >
                            <FormGroup >
                                <Label for={"firstName"} >First Name</Label>
                                <Input className={"firstName"} id={"firstName"} placeholder={"First Name"} />
                            </FormGroup>
                            {' '}
                            <FormGroup >
                                <Label for={"lastName"} >Last Name</Label>
                                <Input className={"lastName"} id={"lastName"} placeholder={"Last Name"} />
                            </FormGroup>
                        </Form>
                    </div>
                    <FormGroup>
                        <Label id={"label"} for={"userEmail"}>Email</Label>
                        <Input type={"email"} className={"userEmail"} id={"userEmail"} placeholder={"Enter email"}/>
                    </FormGroup>
                    <FormGroup>
                        <Label id={"label"} for={"userPass"}>Password</Label>
                        <Input type={"password"} className={"userPass"} id={"userPass"} placeholder={"Enter password"}/>
                    </FormGroup>
                    <FormGroup>
                        <Label id={"label"} for={"confirmUserPass"}>Confirm Password</Label>
                        <Input type={"password"} className={"confirmUserPass"} id={"confirmUserPass"} placeholder={"Confirm password"}/>
                    </FormGroup>
                    <Button onClick={this.handleSignUp} color={"primary"} id={"signUpBtn"}>Sign-Up</Button>
                    {' '}
                    <Button id={"cancelBtn"}>Cancel</Button>
                </Form>
            </div>
        );
    }
}

export default Signup;