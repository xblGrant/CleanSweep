import React from 'react';
import { Button, Label, Form } from 'reactstrap';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: "Guest"
        }
    }

    render() {
        // TODO: Check currently signed in user
        // TODO: Add Logout functionality

        return (
            <Form id={"header"} inline>
                <Label id={"labelHello"} for={"userLink"} size={"sm"}>Hello,</Label>{' '}
                <Button id={"userLink"} color={"link"} size={"sm"}>{this.state.user}</Button>
                <div id={"headerLogin"}>
                    <Button id={"headerBtn"} outline size={"sm"}>Login</Button>
                </div>
            </Form>
        );
    }
}

export default Header;