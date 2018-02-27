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
            <div id={"changePWForm"}>
                <NavigationBar/>
                <Form>
                    <FormGroup row>
                        <Label id={"label"} for="oldPassword">Old Password</Label>
                        <Input type="password" id="oldPW" placeholder={"Old Password"}/>
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="newPassword">New Password</Label>
                        <Input type="password" id="newPW" placeholder={"New Password"}/>
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="newPasswordVerification">Reenter New Password</Label>
                        <Input type="password" id="newPWVerification" placeholder={"Reenter New Password"} />
                    </FormGroup>
                    <Button onClick={this.handlePasswordChange} color={"Primary"} id={"changePWBtn"}>Submit</Button>
                    {' '}
                    <WrappedButton id={"changePWCancel"} link={"/"} name={"Cancel"}/>
                </Form>
            </div>
        );
    }
}

export default ChangePassword;