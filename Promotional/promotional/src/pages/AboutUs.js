import React from 'react';
import {Helmet} from "react-helmet";
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
                        <hr />
                        <h3>Grant Abbondanza</h3>
                            <p>
                                Student working towards B.S. in Computer Science at Penn State Harrisburg.
                                Interested in: Turing machines, Java, website design, and bleeding edge technologies.
                                Hobbies include: researching multitudes of subjects, such as politics, business, games,
                                and especially anything Elon Musk gets his fingers on. Also enjoys volleyball, table tennis,
                                video games, and cats when in his free time.
                                <br />
                                <a href = "https://www.linkedin.com/in/grant-abbondanza-4a075a115/">
                                    <img className={"center col-sm-1"} src = {Linkedin}
                                         alt = "linkedin"/></a>
                            </p>
                        <h3>Christian Brand</h3>
                            <p>
                                Currently a senior working towards a B.S. in Computer Science at Penn State Harrisburg.
                                Interested in: Data Science, Java, Python, Software Engineering, and Web Development.
                                Hobbies include: listening to music, going to live shows and festivals, cooking, reddit,
                                walking my dog, and video games.
                                <br />
                                <a href = "https://www.linkedin.com/in/christian-brand-947189108/">
                                    <img className={"center col-sm-1"} src = {Linkedin}
                                         alt = "linkedin"/></a>
                            </p>
                        <h3>Adina Lamboy</h3>
                            <p>
                                Currently a Senior at Penn State Harrisburg pursuing a
                                Bachelors Degree in Computer science.
                                <br/>
                                <a href = "https://www.linkedin.com/in/adina-lamboy-a15a43b4">
                                    <img className={"center col-sm-1"} src = {Linkedin}
                                        alt = "linkedin"/></a>
                            </p>
                        <h3>Stuart Perry</h3>
                            <p>
                                A senior Computer Science student working towards a B.S. in Computer Science at Penn State Harrisburg.
                                Interested in Software Engineering, keeping up with latest technology trends, and Finance.
                                Hobbies include: Working on small side projects, learning new things, sports, and video games.
                                <br />
                                <a href = "https://www.linkedin.com/in/stuart-perry/">
                                    <img className={"center col-sm-1"} src = {Linkedin}
                                         alt = "linkedin"/></a>
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
                                    <img className={"center col-sm-1"} src = {twitter}
                                        alt = "twitter"/></a>
                            </p>
                        <h3>Kyle Weldon</h3>
                            <p>
                                Senior in Computer Science at Penn State Harrisburg.
                                Interested in: software engineering/development, web development, etc.
                                Hobbies: learning about new cultures, cooking, and traveling.
                                <a href={"www.linkedin.com/in/kyle-weldon-6462b480"}>
                                    <img className={"center col-sm-1"} src = {Linkedin}
                                         alt = "linkedin"/></a>
                            </p>
                    </div>
                </div>
            </div>

        );
    }
}
export default About;

