import React from 'react';
import SelectableAlbum from './SelectableAlbum';
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';

const ROOM = 0;
const STATUS = 1;
const INCIDENT = 2;
const GUEST = 3;
const ASSIGNED = 4;
const IS_RESERVABLE = 5;

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

const LinkToRooms = ({items}) => (
    items.map((item, i) => (
            item[IS_RESERVABLE] ? <ReservableLink key={i} item={item} id={i}/> :
                <NonReservableLink key={i} item={item} id={i}/>
    ))
);

function ReservableLink(props) {
    return (
        <Link to={routes.RESERVABLE_ROOM + props.item[ROOM]}>
            <SelectableAlbum
                key={`${props.item[ROOM]}${props.id}`}
                roomNum={props.item[ROOM]}
                status={props.item[STATUS]}
                assigned={props.item[ASSIGNED]}
                incident={props.item[INCIDENT]}
                guest={props.item[GUEST]}
            />
        </Link>
    )
}

function NonReservableLink(props) {
    return (
        <Link to={routes.NON_RESERVABLE_ROOM + props.item[ROOM]}>
            <SelectableAlbum
                key={`${props.item[ROOM]}${props.id}`}
                roomNum={props.item[ROOM]}
                status={props.item[STATUS]}
                assigned={props.item[ASSIGNED]}
                incident={props.item[INCIDENT]}
                guest={props.item[GUEST]}
            />
        </Link>
    )
}




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