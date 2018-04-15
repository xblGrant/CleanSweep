import React from 'react';
import {Helmet} from "react-helmet";
import {ABOUT} from "../constants/routes";
import twitter from "../Doc/Twitter.png";
import Linkedin from "../Doc/Linkedin.png";

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
                        <br/>
                        <h3>Grant Abbondanza</h3>
                            <p>

                            </p>
                        <h3>Christian Brand</h3>
                            <p>

                            </p>
                        <h3>Adina Lamboy</h3>
                            <p>
                                Currently a Senior at Penn State Harrisburg persuing a
                                Bachelors Degree in Computer science.
                                <br/>
                                <a href = "https://www.linkedin.com/in/adina-lamboy-a15a43b4">
                                    <img className={"center col-sm-1"} src = {Linkedin}/></a>
                            </p>
                        <h3>Stuart Perry</h3>
                            <p>

                            </p>
                        <h3>James Ringler</h3>
                            <p>
                                Student working towards BS in Computer science major at
                                Penn State Harrisburg,
                                future game dev, coder, gamer, US Vet.
                                Air Force,
                                proud father, loving husband.
                                <br/>
                                <a href = "https://twitter.com/JamesRingler86?s=09">
                                    <img className={"center col-sm-1"} src = {twitter}/></a>
                            </p>
                        <h3>Kyle Weldon</h3>
                            <p>

                            </p>
                    </div>
                </div>
            </div>

        );
    }
}
export default About;

