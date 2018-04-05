import React from 'react';
import SelectableAlbum from './SelectableAlbum';
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';
import * as constant from '../constants/constants';

const SelectableRooms = ({items}) => (
    items.map((item, i) => (
        <SelectableAlbum
            key={`${item[constant.ROOM]}${i}`}
            roomName={item[constant.ROOM]}
            status={item[constant.STATUS]}
            incident={item[constant.INCIDENT]}
            inspect={item[constant.INSPECT]}
            guest={item[constant.GUEST]}
            wakeupcall={item[constant.WAKE_UP_CALL]}
            assigned={item[constant.ASSIGNED]}
            isReservableRoom={item[constant.IS_RESERVABLE_ROOM]}
            floor={item[constant.FLOOR]}
        />
    ))
);

const LinkToRooms = ({items}) => (
    items.map((item, i) => (
            item[constant.IS_RESERVABLE_ROOM] ? <ReservableLink key={i} item={item} id={i}/> :
                <NonReservableLink key={i} item={item} id={i}/>
    ))
);

function ReservableLink(props) {
    return (
        <Link to={routes.RESERVABLE_ROOM + props.item[constant.ROOM]}>
            <SelectableAlbum
                key={`${props.item[constant.ROOM]}${props.id}`}
                roomName={props.item[constant.ROOM]}
                status={props.item[constant.STATUS]}
                incident={props.item[constant.INCIDENT]}
                inspect={props.item[constant.INSPECT]}
                guest={props.item[constant.GUEST]}
                wakeupcall={props.item[constant.WAKE_UP_CALL]}
                assigned={props.item[constant.ASSIGNED]}
                isReservableRoom={props.item[constant.IS_RESERVABLE_ROOM]}
                floor={props.item[constant.FLOOR]}
            />
        </Link>
    )
}

function NonReservableLink(props) {
    return (
        <Link to={routes.NON_RESERVABLE_ROOM + props.item[constant.ROOM]}>
            <SelectableAlbum
                key={`${props.item[constant.ROOM]}${props.id}`}
                roomName={props.item[constant.ROOM]}
                status={props.item[constant.STATUS]}
                incident={props.item[constant.INCIDENT]}
                inspect={props.item[constant.INSPECT]}
                guest={props.item[constant.GUEST]}
                wakeupcall={props.item[constant.WAKE_UP_CALL]}
                assigned={props.item[constant.ASSIGNED]}
                isReservableRoom={props.item[constant.IS_RESERVABLE_ROOM]}
                floor={props.item[constant.FLOOR]}
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