import React from 'react';
import SelectableAlbum from './SelectableAlbum';

class SelectableList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.props.items;
    }

    render() {
        let items = this.props.items;

        return(
            <div>
                <div className={"albums"}>
                    {items.map((item, i) => (
                        <SelectableAlbum
                            key={`${item.getRoom}${i}`}
                            roomNum={item.getRoom}
                            status={item.getStatus}
                            incident={item.getIncident}
                            emp={item.getEmployee}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default SelectableList;