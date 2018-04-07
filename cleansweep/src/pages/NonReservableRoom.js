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
            currentUser: null,
            assignedEmployee: "none",
            assignedEmployeeName: null,
            incidentList: [],
            status: null,
            incident: null,
            inspect: null,
            editIncidents: false,
        };

        this.handleEditIncidents = this.handleEditIncidents.bind(this);
    }

    componentWillMount() {
        api.getNonReservableRoomInformation(this, this.props.match.params.roomid);
    }

    handleEditIncidents() {
        this.setState({editIncidents: !this.state.editIncidents})
    }

    render() {
        let info = this.state;
        let roomInfo = [info.roomID, info.floorNum];

        let employeeMessage;
        if (info.assignedEmployee !== "none") {
            employeeMessage = "Assigned to " + info.assignedEmployeeName;
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

        let statusComponent = null;
        if (info.currentUser === info.assignedEmployee) {
            statusComponent = <StatusComponent floor={info.floorNum}
                                                   room={info.roomID}
                                                   status={info.status}
                                                   haveIncident={info.incident}
                                                   that={this}/>;
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
            incidentComponent = <AddIncidentComponent floor={info.floorNum} room={info.roomID} that={this}/>
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
                {statusComponent}
                <hr/>
                {incidentComponent}
            </div>
        );
    }
}

class StatusComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            statusChange: false,
            updatedStatus: "Dirty",
            error: false
        };

        this.handleUpdatedStatus = this.handleUpdatedStatus.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus() {
        let {updatedStatus} = this.state;
        let {floor, room, that, haveIncident, status} = this.props;
        if (!haveIncident || status === 'Clean') {
            api.changeRoomStatus(that, updatedStatus, floor, room, false);
            this.handleStatusChange();
        } else {
            this.setState({error: true});
        }
    }

    handleUpdatedStatus(e) {
        let updatedStatus = e.target.value;
        this.setState({updatedStatus: updatedStatus});
    }

    handleStatusChange() {
        this.setState({
            statusChange: !this.state.statusChange,
            error: false
        });
    }

    render() {
        let info = this.state;
        let statusComponent;
        if (info.statusChange) {
            statusComponent =
                <div className={"col-sm-4 center"}>
                    <label>Status</label>
                    <Input onClick={this.handleUpdatedStatus} type="select" id="statusSelect">
                        <option value={"Dirty"}>Dirty</option>
                        <option value={"Clean"}>Clean</option>
                    </Input>
                    <button className={"color2"} onClick={this.changeStatus}>Update</button>
                    <button className={"color2"} onClick={this.handleStatusChange}>Cancel</button>
                </div>

        } else {
            statusComponent =
                <div className={"center"}>
                    <button className={"color2"} onClick={this.handleStatusChange}>Update Status</button>
                </div>
        }

        return (
            <div>
                {info.error && <p typeof={"error"} className={"error"} id={"error"}>
                    {"All incidents must be resolved before status can be changed"}</p>}
                {statusComponent}
            </div>
        );
    }
}

class AddIncidentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            add: false,
            comment: null,
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
        this.setState({comment: comment});
    }

    handleIncident() {
        let info = this.state;
        let {that, floor, room} = this.props;
        api.addIncidentFromRoomPage(that, floor, room, info.comment, false);
        this.setState({add: false});
    }

    render() {
        let info = this.state, incidentComponent;
        if (!info.add) {
            incidentComponent =
                <div className={"center"}>
                    <button className={"color2"} onClick={this.handleAddIncident}>Add Incident</button>
                </div>
        } else {
            let isDisabled = this.state.comment === null;
            incidentComponent =
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

        return (incidentComponent);
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
        this.setState({comment: comment});
    }

    handleIncident() {
        let info = this.state;
        api.addIncidentFromRoomPage(this.props.instance, info.roomInfo[1], info.roomInfo[0], info.comment, false);
        document.getElementById("incidentComment").value = '';
        this.setState({comment: null});
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
        api.resolveIncident(this.props.instance, info.room, info.key, info.floor, false);
    }

    handleUpdateComment() {
        let info = this.state;
        let that = this.props.instance;
        api.updateIncident(that, info.room, info.key, info.updatedIncident, false);
        this.setState({incident: info.updatedIncident});
    }

    render() {
        let info = this.state;
        let isDisabled = info.incident === info.updatedIncident;

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