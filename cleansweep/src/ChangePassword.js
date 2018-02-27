import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class ChangePassword extends React.Component{
    constructor(props){
        super(props);

        this.handlePasswordChange = this.handlePasswordChange.bind(this)

    }

    handlePasswordChange(){


    }


    render(){
        return(
            <div id={"changePasswordForm"}>
                <NavigationBar/>
                <Form>
                    <FormGroup row>
                        <Label id={"label"} for="oldPassword">Old Password</Label>
                        <Input type="password" id="oldPassword" placeholder={"Old Password"}/>
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="newPassword">New Password</Label>
                        <Input type="password" id="newPassword" placeholder={"New Password"}/>
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="newPasswordVerification">Reenter New Password</Label>
                        <Input type="password" id="newPasswordVerification" placeholder={"Reenter New Password"} />
                    </FormGroup>
                    <FormGroup row>
                        <Button onClick={this.handlePasswordChange} color={"Primary"} id={"changePasswordSubmit"}>
                            Submit
                        </Button>
                        <WrappedButton id={"changePasswordCancel"} link={"/"} name={"Cancel"}/>
                    </FormGroup>
                </Form>
            </div>
        );
    }


}

export default ChangePassword;