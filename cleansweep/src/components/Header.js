import React from 'react';
import { Button, Label, Form } from 'reactstrap';
import WrappedButton from './WrappedButton';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: "Guest"
        };
    }

    render() {
        // TODO: Check currently signed in user
        // TODO: Add Logout functionality

        let isLoggedIn = this.props.isLoggedIn;

        let button;
        if (!isLoggedIn) {
            button = <WrappedButton id={"headerBtn"} isOutlined={true} link={"/login"} name={"Login"}/>
        } else {
            button = <Button onClick={this.props.handleLogout} id={"headerBtn"} outline size={"sm"}>Logout</Button>
        }

        return (
            <div className={"ml-auto"}>
                <Form id={"header"} inline>
                    <Label id={"labelHello"} for={"userLink"} size={"sm"}>Hello,</Label>{' '}
                    <Button id={"userLink"} color={"link"} size={"sm"}>{this.state.user}</Button>
                    <div id={"headerLogin"}>
                        {button}
                    </div>
                </Form>
            </div>
        );
    }
}

export default Header;