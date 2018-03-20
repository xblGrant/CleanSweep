import React from 'react';
import {Form, Label} from 'reactstrap';
import {firebase} from '../firebase';
import { withRouter } from 'react-router-dom';


class Room extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomID: null
        }
    }

    //when component is passed through react router
    //and the route has a ":" in it,
    //the identifier after it is the parameter.
    //I call the parameter by this.props.match.params.roomid
    //roomid is the explicit name of the identifier after the
    //route in App.js.
    componentDidMount() {
        this.setState({
            roomID: this.props.match.params.roomid
        });

    }

    //TODO: Display and format corresponding room information
    //TODO: cont... regarding roomID (don't change roomID. it is correct)
    render() {
        return (
            <div id='roomPage'>
                <p>{this.state.roomID}</p>
            </div>
        );
    }
}

export default Room;