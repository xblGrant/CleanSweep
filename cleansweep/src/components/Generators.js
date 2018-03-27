import React from 'react';
import * as api from '../firebase/api';

const radix = 10;

function CreateRoomOptions(props) {
    return (
        props.rooms.map(
            (roomNum) => {
                return (
                    <option value={roomNum}>{roomNum}</option>
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
                                <option value={floorNum}>{parseInt(floorNum, radix) / 100}</option> :
                                <option value={'000'}>All</option>
                        )
                    } else {
                        return (
                            (floorNum !== 0) ?
                                <option value={floorNum}>{parseInt(floorNum, radix) / 100}</option> :
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
};
