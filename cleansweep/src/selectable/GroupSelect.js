import React from 'react';
import { SelectableGroup } from 'react-selectable-fast';
import SelectableList from './SelectableList';

import '../css/selectable.css';

class GroupSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tolerance: 0,
        };
    }

    render() {
        const { tolerance, isGlobal } = this.state;

        return (
            <div id={"selectable"}>
                <SelectableGroup
                    ref={ref => window.selectableGroup = ref}
                    className="main"
                    clickClassName="tick"
                    enableDeselect
                    deselectOnEsc={false}
                    tolerance={tolerance}
                    globalMouse={isGlobal}
                    allowClickWithoutSelected={true}
                    disabled={true}
                    ignoreList={['.not-selectable', '.item:nth-child(10)', '.item:nth-child(27)']}
                >
                    <SelectableList items={this.props.items} />
                </SelectableGroup>
            </div>
        )
    }
}

export default GroupSelect;