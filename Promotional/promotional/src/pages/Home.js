import React from 'react';
import {Helmet} from "react-helmet";
import AllRooms from "../pages/AllRooms.png";

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
                    <div>
                        <h2 className={"col-sm-6  col-md-10 center"}>Overview</h2>
                        <hr />
                        <p>
                                CleanSweep is a room cleaning optimization web application designed for any browser compatible device.
                                This program will be used by housekeepers and front desk staff to maintain
                                orderly and efficient cleaning, accommodate guest requests, and minimize the
                                dead time between when a room is cleaned and when a guest can check in.
                                This program will be a windows application that is based at the front desk.
                                Housekeepers will use any device with a browser to receive the most up-to- date
                                information such as: room maintenance, last minute changes, and the order rooms
                                in which should be cleaned.

                        </p>
                        <div>
                        <img className={"center col-sm-12"} src = {AllRooms}
                             alt = "cleansweepdoc1"/>
                    </div>

                    </div>
                </div>
            </div>

        );
    }
}
export default Home;