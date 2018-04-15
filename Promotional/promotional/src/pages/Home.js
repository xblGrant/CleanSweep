import React from 'react';
import {Helmet} from "react-helmet";
import {HOME} from "../constants/routes";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleHome = this.handleHome.bind(this);
    }

    handleHome() {

    }

    render() {

        return (
            <div>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <div className={"container"}>
                    <div className={"col-sm-6  col-md-10 center"}>
                        <h2 className={"center"}>Clean Sweep</h2>

                    </div>
                </div>
            </div>

        );
    }
}
export default Home;