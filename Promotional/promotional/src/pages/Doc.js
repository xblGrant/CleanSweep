import React from 'react';
import {Helmet} from "react-helmet";
import pic1 from "../Doc/_Project CleanSweep-page-001.jpg";
import pic2 from "../Doc/_Project CleanSweep-page-002.jpg";
import pic3 from "../Doc/_Project CleanSweep-page-003.jpg";
import pic4 from "../Doc/_Project CleanSweep-page-004.jpg";
import pic5 from "../Doc/_Project CleanSweep-page-005.jpg";
import pic6 from "../Doc/_Project CleanSweep-page-006.jpg";
import pic7 from "../Doc/_Project CleanSweep-page-007.jpg";
import pic8 from "../Doc/_Project CleanSweep-page-008.jpg";
import pic9 from "../Doc/_Project CleanSweep-page-009.jpg";
import pic10 from "../Doc/_Project CleanSweep-page-010.jpg";
import pic11 from "../Doc/_Project CleanSweep-page-011.jpg";
import pic12 from "../Doc/_Project CleanSweep-page-012.jpg";
import pic13 from "../Doc/_Project CleanSweep-page-013.jpg";
import pic14 from "../Doc/_Project CleanSweep-page-014.jpg";
import pic15 from "../Doc/_Project CleanSweep-page-015.jpg";
import pic16 from "../Doc/_Project CleanSweep-page-016.jpg";
import pic17 from "../Doc/_Project CleanSweep-page-017.jpg";

class Doc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleDoc = this.handleDoc.bind(this);
    }

    handleDoc() {

    }

    render() {

        return (
            <div>
                <Helmet>
                    <title>Documentation</title>
                </Helmet>
                <div className={"container"}>
                    <div className={"col-sm-6  col-md-10 center"}>
                        <h2 className={"center"}>Documentation</h2>
                        <hr />
                        <p>
                            <img className={"center col-sm-12"} src = {pic1}
                                alt = "cleansweepdoc1"/>
                            <img className={"center col-sm-12"} src = {pic2}
                                 alt = "cleansweepdoc2"/>
                            <img className={"center col-sm-12"} src = {pic3}
                                 alt = "cleansweepdoc3"/>
                            <img className={"center col-sm-12"} src = {pic4}
                                 alt = "cleansweepdoc4"/>
                            <img className={"center col-sm-12"} src = {pic5}
                                 alt = "cleansweepdoc5"/>
                            <img className={"center col-sm-12"} src = {pic6}
                                 alt = "cleansweepdoc6"/>
                            <img className={"center col-sm-12"} src = {pic7}
                                 alt = "cleansweepdoc7"/>
                            <img className={"center col-sm-12"} src = {pic8}
                                 alt = "cleansweepdoc8"/>
                            <img className={"center col-sm-12"} src = {pic9}
                                 alt = "cleansweepdoc9"/>
                            <img className={"center col-sm-12"} src = {pic10}
                                 alt = "cleansweepdoc10"/>
                            <img className={"center col-sm-12"} src = {pic11}
                                 alt = "cleansweepdoc11"/>
                            <img className={"center col-sm-12"} src = {pic12}
                                 alt = "cleansweepdoc12"/>
                            <img className={"center col-sm-12"} src = {pic13}
                                 alt = "cleansweepdoc13"/>
                            <img className={"center col-sm-12"} src = {pic14}
                                 alt = "cleansweepdoc14"/>
                            <img className={"center col-sm-12"} src = {pic15}
                                 alt = "cleansweepdoc15"/>
                            <img className={"center col-sm-12"} src = {pic16}
                                 alt = "cleansweepdoc16"/>
                            <img className={"center col-sm-12"} src = {pic17}
                                 alt = "cleansweepdoc17"/>
                        </p>

                    </div>
                </div>
            </div>

        );
    }
}
export default Doc;

