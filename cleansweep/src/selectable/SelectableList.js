import React from 'react';
import SelectableAlbum from './SelectableAlbum';
import {NavItem, NavLink} from 'reactstrap';
import * as routes from '../constants/routes';

class SelectableList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.props.items;
    }

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
                        <NavItem>
                            <NavLink href={routes.HELP}>
                                <SelectableAlbum
                                    key={`${item[ROOM]}${i}`}
                                    roomNum={item[ROOM]}
                                    status={item[STATUS]}
                                    assigned={item[ASSIGNED]}
                                    incident={item[INCIDENT]}
                                    guest={item[GUEST]}
                                />
                            </NavLink>
                        </NavItem>
                    ))}
                </div>
            </div>
        )
    }
}

export default SelectableList;