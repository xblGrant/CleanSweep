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
                            </p>
                        <h3>Stuart Perry</h3>
                            <p>

                            </p>
                        <h3>James Ringler</h3>
                            <p>

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

