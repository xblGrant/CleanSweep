import React from 'react';
import * as api from '../firebase/api';
import {Input, Button} from 'reactstrap';
import {Helmet} from "react-helmet";

class ReservableRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validRoom: false,
            roomType: null,
            roomID: null,
            floorNum: null,
            currentUser: null,
            isAdmin: false,
            assignedEmployee: "none",
            assignedEmployeeName: null,
            guest: null,
            incidents: null,
            incidentList: [],
            isReservable: null,
            status: null,
            wakeupCall: 'none',
        };

        this.handleEditIncidents = this.handleEditIncidents.bind(this);
    }

    componentWillMount() {
        api.getReservableRoomInformation(this, this.props.match.params.roomid);
    }

    handleEditIncidents() {
        this.setState({editIncidents: !this.state.editIncidents})
    }

    render() {
        let info = this.state;
        let roomInfo = [info.roomID, info.floorNum];

        let guestMessage;
        if (info.guest) {
            guestMessage = "Occupied";
        } else {
            guestMessage = "Vacant";
        }

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

        let wakeUpComponent =
            <div>
                <WakeUpComponent wakeUpCall={info.wakeupCall} room={info.roomID} isAdmin={info.isAdmin} that={this}/>
                <hr/>
            </div>;

        let statusComponent = null;
        if (info.currentUser === info.assignedEmployee) {
            statusComponent =
                <div>
                    <StatusComponent floor={info.floorNum} room={info.roomID} status={info.status}
                                     haveIncident={info.incident} assignedEmp={info.assignedEmployee} that={this}/>
                    <hr/>
                </div>;
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
            <div>
                <Helmet>
                    <title>{info.roomID}</title>
                    <body className={"background-to-bottom"}/>
                </Helmet>
                <div className={"container"}>
                    <h2 className={"center"}>{info.roomID}</h2>
                    <h6 className={"center"}>{info.status}</h6>
                    <p className={"center"}>{"Floor: " + info.floorNum / 100}</p>
                    <p className={"center"}>{guestMessage}</p>
                    <br/>
                    <p className={"center"}>{employeeMessage}</p>
                    <p className={"center"}>{inspectMessage}</p>
                    <hr/>
                    {statusComponent}
                    {wakeUpComponent}
                    {incidentComponent}
                </div>
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
        let {floor, room, that, haveIncident, status, assignedEmp} = this.props;
        if (!haveIncident || status === 'Clean') {
            api.changeRoomStatus(that, updatedStatus, floor, room, assignedEmp, true);
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
                    <h6>Status</h6>
                    <Input onClick={this.handleUpdatedStatus} type="select" id="statusSelect">
                        <option value={"Dirty"}>Dirty</option>
                        <option value={"Clean"}>Clean</option>
                    </Input>
                    <button className={"btn btn-primary"} onClick={this.changeStatus}>Update</button>
                    <button className={"btn btn-danger"} onClick={this.handleStatusChange}>Cancel</button>
                </div>

        } else {
            statusComponent =
                <div className={"center"}>
                    <button className={"btn btn-primary"} onClick={this.handleStatusChange}>Update Status</button>
                </div>
        }

        return (
            <div>
                {info.error && <p typeof={"error "} className={"error col-sm-4 center"} id={"error"}>
                    {"All incidents must be resolved before status can be changed"}</p>}
                {statusComponent}
            </div>
        );
    }
}

class WakeUpComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editWakeUp: false,
            wakeUpDate: null,
            wakeUpTime: null
        };

        this.handleDate = this.handleDate.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleEditWakeUp = this.handleEditWakeUp.bind(this);
        this.handleClearWakeUpCall = this.handleClearWakeUpCall.bind(this);
        this.handleUpdateWakeUpCall = this.handleUpdateWakeUpCall.bind(this);
    }

    handleEditWakeUp() {
        this.setState({
            editWakeUp: !this.state.editWakeUp,
            wakeUpDate: null,
            wakeUpTime: null,
            error: false
        });
    }

    handleUpdateWakeUpCall() {
        let {room, that} = this.props;
        let {wakeUpDate, wakeUpTime} = this.state;

        if (wakeUpDate !== null && wakeUpTime !== null) {
            let parts = wakeUpDate.split('-');
            let date = parts[1] + '/' + parts[2] + '/' + parts[0];
            let floor = Math.floor(room / 100) * 100;

            api.updateWakeUpCallFromRoom(that, room, floor, date, wakeUpTime);
            this.handleEditWakeUp();
        } else {
            this.setState({error: true})
        }

    }

    handleClearWakeUpCall() {
        let {room, that} = this.props;
        let floor = Math.floor(room / 100) * 100;

        api.clearWakeUpCallFromRoom(that, room, floor);
        this.handleEditWakeUp();
    }

    handleTime(e) {
        let time = e.target.value;
        if (time === '') {
            time = null
        }
        this.setState({wakeUpTime: time})
    }

    handleDate(e) {
        let date = e.target.value;
        if (date === '') {
            date = null
        }
        this.setState({wakeUpDate: date})
    }

    render() {
        let {wakeUpCall, isAdmin} = this.props;
        let {editWakeUp, error} = this.state;

        let parts = wakeUpCall.split('-');
        let date = parts[0], time = parts[1];

        let table = null;
        let buttonName = "Add Wake-Up Call";
        if (wakeUpCall !== 'none') {
            buttonName = "Update Wake-Up Call";
            table =
                <div className={"col-sm-4 center"}>
                    <table className={"text-center table table-striped table-hover whiteBG"}>
                        <thead>
                        <th>Date</th>
                        <th>Time</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{date}</td>
                            <td>{time}</td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                </div>;
        }


        let buttons = null;
        let wakeUpComponent = null;
        if (isAdmin) {
            buttons = <button className={"btn btn-primary"} onClick={this.handleEditWakeUp}>{buttonName}</button>;
            if (editWakeUp) {
                buttons =
                    <div>
                        <br/>
                        <button className={"btn btn-primary"} onClick={this.handleUpdateWakeUpCall}>Update</button>
                        <button className={"btn btn-secondary"} onClick={this.handleClearWakeUpCall}>Clear</button>
                        <button className={"btn btn-danger"} onClick={this.handleEditWakeUp}>Cancel</button>
                    </div>;
                wakeUpComponent =
                    <div>
                        <div className={"col-sm-4 center"}>
                            <label>Date</label>
                            <Input onChange={this.handleDate} type="date" id="wakeUpDate" placeholder={"date"}/>
                        </div>
                        <div className={"col-sm-4 center"}>
                            <label>Time</label>
                            <Input onChange={this.handleTime} type="time" id="wakeUpTime" placeholder={"time"}/>
                        </div>
                    </div>;
            }
        }

        return (
            <div className={"center"}>
                <h6>Wake-Up Call</h6>
                {table}
                {error && <p typeof={"error"} className={"error col-sm-4 center"} id={"error"}>
                    {"Both date and time need to be selected"}</p>}
                {wakeUpComponent}
                {buttons}
            </div>
        )
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
        api.addIncidentFromRoomPage(that, floor, room, info.comment, true);
        this.setState({add: false});
    }

    render() {
        let info = this.state, incidentComponent;
        if (!info.add) {
            incidentComponent =
                <div className={"center"}>
                    <button className={"btn btn-primary"} onClick={this.handleAddIncident}>Add Incident</button>
                </div>
        } else {
            let isDisabled = this.state.comment === null;
            incidentComponent =
                <div className={"center"}>
                    <label>Add Incident</label>{' '}
                    <Input onChange={this.handleComment} type="textarea" className={"col-sm-4 center"}
                           id="incidentComment"
                           placeholder={"Enter comment here"}/>
                    <br/>
                    <div className={"col-sm-5 center"}>
                        <Button disabled={isDisabled} onClick={this.handleIncident}
                                className={"btn btn-primary col-sm-4"}
                                color={"primary"}>Add Incident</Button>
                        <Button className={" btn btn-primary col-sm-4"} onClick={this.handleAddIncident}>Done</Button>
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
            <h5 className={"center"}>Incidents</h5>
            <br/>
            <div className={"center"}>
                <button className={"btn btn-primary col-sm-2 center"} onClick={editIncidents}>Edit</button>
            </div>
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
        api.addIncidentFromRoomPage(this.props.instance, info.roomInfo[1], info.roomInfo[0], info.comment, true);
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
                    <Input onChange={this.handleComment} type="textarea" className={"col-sm-8 center"}
                           id="incidentComment"
                           placeholder={"Enter comment here"}/>
                    <div className={"col-sm-5 center"}>
                        <Button disabled={isDisabled} onClick={this.handleIncident} className={"col-sm-4 margin-5"}
                                color={"primary"}>Add Incident</Button>
                        <Button className={"col-sm-4 margin-5"} onClick={this.handleAddIncident}>Done</Button>
                    </div>
                </div>;
        }

        return (
            <div>
                <div>
                    <h5 className={"center"}>Incidents</h5>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-4"}/>
                        <button className={"btn btn-primary margin-5 col-sm-2"} onClick={this.handleAddIncident}>Add</button>
                        <div/>
                        <button className={"btn btn-success margin-5 col-sm-2"} onClick={editIncidents}>Done</button>
                        <div className={"col-sm-4"}/>
                    </div>
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
        api.resolveIncident(this.props.instance, info.room, info.key, info.floor, true);
    }

    handleUpdateComment() {
        let info = this.state;
        let that = this.props.instance;
        api.updateIncident(that, info.room, info.key, info.updatedIncident, true);
        this.setState({incident: info.updatedIncident});
    }

    render() {
        let info = this.state;
        let isDisabled = info.incident === info.updatedIncident;

        return (
            <div>
                <Input onChange={e => this.setState(byPropKey('updatedIncident', e.target.value))}
                       className={"col-sm-8 padding-5"}
                       type={"text"} value={info.updatedIncident}/>
                <div className={"row"}>
                    <button className={"col-sm-4 margin-5 btn btn-primary"} onClick={this.handleUpdateComment}
                            disabled={isDisabled}>Update
                    </button>
                    <div/>
                    <button className={"col-sm-4 margin-5 btn btn-success"} onClick={this.handleResolve}>Resolve
                    </button>
                </div>
            </div>

        )
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

export default ReservableRoom;