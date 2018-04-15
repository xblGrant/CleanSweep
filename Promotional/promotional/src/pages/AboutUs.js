import React from 'react';
import {Helmet} from "react-helmet";
import {ABOUT} from "../constants/routes";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleAbout = this.handleAbout.bind(this);
    }

    handleAbout() {

    }

    render() {

        return (
            <div>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <div className={"container"}>
                    <div className={"col-sm-6  col-md-10 center"}>
                        <h2 className={"center"}>About Us</h2>

                    </div>
                </div>
            </div>

        );
    }
}
export default About;

