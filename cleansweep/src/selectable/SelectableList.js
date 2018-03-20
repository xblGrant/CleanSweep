import React from 'react';
import SelectableAlbum from './SelectableAlbum';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';


class SelectableList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.props.items;
    }


    //Link to section
    //  --look at routes.ROOM and how we pass the room Number
    //  --as the route
    render() {
        let items = this.props.items;
        const ROOM = 0;
        const STATUS = 1;
        const INCIDENT = 2;
        const GUEST = 3;
        const ASSIGNED = 4;

        return (
            <div>
                <div className={"albums"}>
                    {items.map((item, i) => (
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
                    ))}
                </div>
            </div>
        )
    }
}

export default SelectableList;