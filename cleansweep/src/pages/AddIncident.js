import React from 'react';
import NavigationBar from '../components/NavigationBar';
import WrappedButton from "../components/WrappedButton";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

class AddIncident extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };

        this.handleIncident = this.handleIncident.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleIncident() {

    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div>
                <head>
                    <title>Incident Report</title>
                </head>
                <div id={"incidentRoomForm"}>
                    <NavigationBar/>
                    <Form>
                        <FormGroup>
                            <Label id={"label"} for="floorSelect">Floor</Label>
                            <Input type="select" className="floorSelect" id="floorSelect" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            {/*<Label id={"label"} for="roomList"></Label>*/}
                            <Input type="textarea" id="roomList"
                                   placeholder={"List of rooms on floor will show up here"}/>
                            {/*TODO: THIS SHOULD BE A REACT-SELECTABLE-FAST THAT POPULATES OR REACTSTRAP ListGroup*/}
                        </FormGroup>
                        <FormGroup row>
                            <Label id={"label"} for="incidentComment">Comment</Label>
                            <Input type="textarea" id="incidentComment" placeholder={"Enter comment here"}/>
                        </FormGroup>
                        <Button onClick={this.handleIncident} color={"primary"} id={"submitIncidentBtn"}>Submit</Button>
                        {' '}
                        <WrappedButton id={"checkInCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddIncident;