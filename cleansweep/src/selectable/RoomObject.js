import React from 'react';

export default class RoomObject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomNum: this.props.room,
            status: this.props.status,
            incident: this.props.incident,
            assignedEmp: this.props.emp,
        }
    }

    getRoom(){
        return (this.state.roomNum);
    }
    getStatus(){
        return (this.state.status);
    }
    getIncident(){
        return (this.state.incident);
    }
    getEmployee(){
        return (this.state.assignedEmp);
    }
}