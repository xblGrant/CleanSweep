import React from 'react';
import * as api from '../firebase/api';

class NonReservableRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validRoom: false,
            roomType: null,
            roomID: null,
            floorNum: null,
            assignedEmployee: null,
            incidentList: null,
            status: null,
            incident: null,
            inspect: null,
            editIncidents: false
        };

        this.handleEditIncidents = this.handleEditIncidents.bind(this);
    }

    componentWillMount() {
        api.getNonReservableRoomInformation(this, this.props.match.params.roomid);
    }

    handleEditIncidents() {
        this.setState({
            editIncidents: !this.state.editIncidents
        })
    }

    render() {
        let info = this.state;

        let employeeMessage;
        if (info.assignedEmployee !== null) {
            employeeMessage = "Assigned to " + info.assignedEmployee;
        } else {
            employeeMessage = "Not Assigned";
        }

        // TODO: create Inspection Needed: check or X
        let inspectMessage;
        if (info.inspect) {
            inspectMessage = "Needs Inspected";
        } else {
            inspectMessage = "No Inspection Needed";
        }

        let incidentComponent;
        if (info.incident) {
            if (info.editIncidents) {
                incidentComponent = <EditIncidentComponent incidents={info.incidentList} editIncidents={this.handleEditIncidents}/>;
            } else {
                incidentComponent = <IncidentComponent incidents={info.incidentList} editIncidents={this.handleEditIncidents}/>;
            }
        } else {
            incidentComponent = null;
        }


        return (
            <div className={"container"}>
                <h2 className={"center"}>{info.roomID}</h2>
                <h6 className={"center"}>{info.status}</h6>
                <p className={"center"}>{"Floor: " + info.floorNum / 100}</p>
                <br/>
                <p className={"center"}>{employeeMessage}</p>
                <p className={"center"}>{inspectMessage}</p>
                <br/>
                {incidentComponent}
            </div>
        );
    }
}

function IncidentComponent(props) {
    let {incidents, editIncidents} = props;

    return (
        <div>
            <label>Incidents</label>{' '}
            <button onClick={editIncidents}>Edit</button>
        </div>
    );
}

function EditIncidentComponent(props) {
    let {incidents, editIncidents} = props;

    return(
        <div>
            <label>Edit Incidents</label>{' '}
            <button onClick={editIncidents}>Done</button>
        </div>
    );
}

export default NonReservableRoom;