import React from 'react';
import * as api from '../firebase/api';
import {Input, Button} from 'reactstrap';

class NonReservableRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validRoom: false,
            roomType: null,
            roomID: null,
            floorNum: null,
            assignedEmployee: null,
            incidentList: [],
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
        let roomInfo = [info.roomID, info.floorNum];

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
                incidentComponent =
                    <EditIncidentComponent roomInfo={roomInfo}
                                           incidents={info.incidentList}
                                           editIncidents={this.handleEditIncidents}
                                           instance={this}/>;
            } else {
                incidentComponent =
                    <IncidentComponent incidents={info.incidentList}
                                       editIncidents={this.handleEditIncidents}/>;
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
            <label>Incidents</label>
            <button className={"width-10 right-side1"} onClick={editIncidents}>Edit</button>
            <ol>
                {(incidents !== null) ? incidents.map((incident) => (
                    <li key={incident[0]} value={incident[1]}>{incident[1]}</li>
                )) : null}
            </ol>
        </div>
    );
}

class EditIncidentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            add: false,
            roomInfo: props.roomInfo,
            comment: null
        };

        this.handleAddIncident = this.handleAddIncident.bind(this);
        this.handleIncident = this.handleIncident.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    handleAddIncident() {
        this.setState({add: !this.state.add});
    }

    handleComment(e) {
        let comment = e.target.value;
        if (comment === '') {
            comment = null
        }
        this.setState({
            comment: comment
        })
    }

    handleIncident() {
        let info = this.state;
        api.addIncidentFromRoomPage(this.props.instance, info.roomInfo[1], info.roomInfo[0], info.comment, false);
    }

    render() {
        let {incidents, editIncidents, roomInfo, instance} = this.props;
        let addIncident = this.state.add;

        let renderedComponent = null;
        if (addIncident) {
            let isDisabled = this.state.comment === null;
            renderedComponent =
                <div className={"center"}>
                    <label>Add Incident</label>{' '}
                    <Input onChange={this.handleComment} type="textarea" className={"width-30 center"}
                           id="incidentComment"
                           placeholder={"Enter comment here"}/>
                    <div className={"col-sm-5 center"}>
                        <Button disabled={isDisabled} onClick={this.handleIncident} className={"col-sm-4"}
                                color={"primary"}>Add Incident</Button>
                        <Button className={"col-sm-4"} onClick={this.handleAddIncident}>Done</Button>
                    </div>
                </div>;
        }

        return (
            <div>
                <div>
                    <label>Edit Incidents</label>{' '}
                    <button className={"width-10 right-side2"} onClick={this.handleAddIncident}>Add</button>
                    <button className={"width-10"} onClick={editIncidents}>Done</button>
                    {(incidents !== []) ? incidents.map((incident) => (
                        <EditIndividualIncident value={incident}
                                                roomInfo={roomInfo}
                                                key={incident[0]}
                                                instance={instance}/>
                    )) : null}
                </div>
                {renderedComponent}
            </div>
        );
    }
}

class EditIndividualIncident extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: props.value[0],
            incident: props.value[1],
            updatedIncident: props.value[1],
            room: props.roomInfo[0],
            floor: props.roomInfo[1]
        };

        this.handleResolve = this.handleResolve.bind(this);
        this.handleUpdateComment = this.handleUpdateComment.bind(this);
    }

    handleResolve() {
        let info = this.state;
        api.resolveIncident(info.room, info.key, info.floor, false);
        api.getNonReservableRoomInformation(this.props.instance, info.room);
    }

    handleUpdateComment() {
        let info = this.state;
        api.updateIncident(info.room, info.key, info.updatedIncident);

        this.setState({
            incident: info.updatedIncident
        })
    }

    render() {
        let info = this.state;

        let isDisabled =
            info.incident === info.updatedIncident;

        return (
            <div>
                <Input onChange={e => this.setState(byPropKey('updatedIncident', e.target.value))}
                       className={"width-50"}
                       type={"text"} value={info.updatedIncident}/>
                <button onClick={this.handleUpdateComment} disabled={isDisabled}>Update</button>
                <button onClick={this.handleResolve}>Resolve</button>
            </div>
        )
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

export default NonReservableRoom;