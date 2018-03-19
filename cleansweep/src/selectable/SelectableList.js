import React from 'react';
import SelectableAlbum from './SelectableAlbum';

class SelectableList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.props.items;
    }

    render() {
        let items = this.props.items;
        const ROOM = 0;
        const STATUS = 1;
        const INCIDENT = 2;
        const EMP = 3;

        return(
            <div>
                <div className={"albums"}>
                    {items.map((item, i) => (
                        <SelectableAlbum
                            key={`${item[ROOM]}${i}`}
                            roomNum={item[ROOM]}
                            status={item[STATUS]}
                            incident={item[INCIDENT]}
                            emp={item[EMP]}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default SelectableList;