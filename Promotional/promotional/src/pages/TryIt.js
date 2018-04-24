import React from 'react';
import {Helmet} from "react-helmet";
import login from "../pages/Login.png";
import signup from "../pages/SignUp.png";

class TryIt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleTryIt = this.handleTryIt.bind(this);
    }

    handleTryIt() {

    }

    render() {

        return (
            <div>
                <Helmet>
                    <title>TryIt</title>
                </Helmet>
                <div className={"container"}>
                    <div className={"col-sm-6  col-md-10 center"}>
                        <a href = "https://cleansweep-9772a.firebaseapp.com/">
                            <h2>Try It!</h2></a>
                        <hr />


                        <div className={"center"}>
                        <p>When you first click the link it will take you the the Clean Sweep
                            Login page.
                            <div className={"col-sm-6  col-md-10 center"}>
                            <img  src = {login}
                                alt = "login"/>
                            </div>
                        </p>
                    </div>
                        <div className={"center"}>
                        <p>You have the option to create an account as an employee or
                        Login as a Manager.
                            <div className={"col-sm-6  col-md-10 center"}>
                                <img  src = {signup}
                                      alt = "signup"/>
                            </div>
                        </p>
                        </div>
                        <div className={"center"}>
                            <p>If you would like to login as a manager enter the following informaion into
                                the appropriate field
                                <br/>
                            email: test@email.com
                                <br/>
                            password: thisisatest</p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default TryIt;

