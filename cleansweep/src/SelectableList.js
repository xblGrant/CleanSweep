import React from 'react';
import { createSelectable, SelectAll, DeselectAll } from 'react-selectable-fast';
import Room from './Room';

const SelectableComponent = createSelectable(Room);

class SelectableList extends React.Component {
    constructor(props){
        super(props);


    }
    render(){
        return(
            <div>
                {this.props.rooms.map((room) => (
                    <SelectableComponent
                        number={room.name}
                        status={room.status}
                    />
                ))}
            </div>
        )
    }
}
export default SelectableList;