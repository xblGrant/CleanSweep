import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import NavigationBar from "./NavigationBar";
import WrappedButton from "./Components";
import SelectableList from "./SelectableList";
import { SelectableGroup } from 'react-selectable-fast';
//TODO: needs to be sent a list of rooms under props

class RoomList extends React.Component{
    constructor(props){
        super(props);
        this.state =
            {
                tolerance: 10

            };
    }

    render(){
        return(
            <div id={"RoomListSelectableGroup"}>
            <NavigationBar />
            <SelectableGroup
                className="roomList"
                clickClassName="tick"
                enableDeselect
                tolerance={this.state.tolerance}
                allowClickWithoutSelected={false}
                duringSelection={this.handleSelecting}
                onSelectionClear={this.handleSelectionClear}
                onSelectionFinish={this.handleSelectionFinish}
                //ignoreList={}
            >
                <SelectableList rooms={this.props.rooms}/>
            </SelectableGroup>
            </div>
        );
    }
}
export default RoomList;