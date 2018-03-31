import React from 'react';
import * as api from '../firebase/api';

const radix = 10;

function NumberOfRooms(props){
    let returnField = [];
    for (let current = 1; current <= props.total; current++) {
        returnField[current] = <option key={current} value={current}>{current}</option>
    }
    return (
        returnField.map(
            (option) => {
                return(
                    option
                )
            }
        )
    );
}

function CreateEmployeeOptions(props) {
    const EMP_ID = 0;
    const EMP_NAME = 1;
    // const EMP_EMAIL = 2;

    return (
        props.employees.map(
            (employee) => {
                return (
                    <option key={employee[EMP_ID]} value={employee[EMP_ID]}>{employee[EMP_NAME]}</option>
                )
            }
        )
    )
}

function CreateRoomOptions(props) {
    return (
        props.rooms.map(
            (roomNum) => {
                return (
                    <option key={roomNum} value={roomNum}>{roomNum}</option>
                )
            }
        )
    );
}

class CreateFloorOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            floors: []
        }
    }

    componentDidMount() {
        api.getFloorOptions(this);
    }

    render() {
        let floors = this.state.floors;

        return (
            floors.map(
                (floorNum) => {
                    if (this.props.displayAll){
                        return (
                            (floorNum !== 0) ?
                                <option key={floorNum} value={floorNum}>{parseInt(floorNum, radix) / 100}</option> :
                                <option key={floorNum} value={'000'}>All</option>
                        )
                    } else {
                        return (
                            (floorNum !== 0) ?
                                <option key={floorNum} value={floorNum}>{parseInt(floorNum, radix) / 100}</option> :
                                null
                        )
                    }
                }))
    }
    // TODO:  Return the floorNum for other components to use
}
CreateFloorOptions.defaultProps = {
    displayAll: true
};

export {
    CreateFloorOptions,
    CreateRoomOptions,
    CreateEmployeeOptions,
    NumberOfRooms
};
