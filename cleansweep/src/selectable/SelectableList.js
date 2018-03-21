import React from 'react';
import SelectableAlbum from './SelectableAlbum';
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';

const ROOM = 0;
const STATUS = 1;
const INCIDENT = 2;
const GUEST = 3;
const ASSIGNED = 4;

const LinkToRooms = ({items}) => (
    items.map((item, i) => (
        <Link to={routes.ROOM + item[ROOM]}>
            <SelectableAlbum
                key={`${item[ROOM]}${i}`}
                roomNum={item[ROOM]}
                status={item[STATUS]}
                assigned={item[ASSIGNED]}
                incident={item[INCIDENT]}
                guest={item[GUEST]}
            />
        </Link>
    ))
);

const SelectableRooms = ({items}) => (
    items.map((item, i) => (
        <SelectableAlbum
            key={`${item[ROOM]}${i}`}
            roomNum={item[ROOM]}
            status={item[STATUS]}
            assigned={item[ASSIGNED]}
            incident={item[INCIDENT]}
            guest={item[GUEST]}
        />
    ))
);


class SelectableList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.props.items;
    }


    //Link to section
    //  --look at routes.ROOM and how we pass the room Number
    //  --as the route
    render() {
        let display = null;
        let items = this.props.items;

        if (this.props.isDisabled) {
            display = <LinkToRooms items={items}/>
        } else {
            display = <SelectableRooms items={items}/>
        }

        return (
            <div className={"container"}>
                {display}
            </div>
        )
    }
}

export default SelectableList;