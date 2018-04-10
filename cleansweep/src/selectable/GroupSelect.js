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
            <div className={"container"}>
                <SelectableGroup
                    ref={ref => window.selectableGroup = ref}
                    className="main rounded "
                    clickClassName="tick"
                    enableDeselect
                    deselectOnEsc={false}
                    tolerance={tolerance}
                    globalMouse={isGlobal}
                    onSelectionFinish={this.props.onSelectionFinish}
                    onSelectionClear={this.props.onSelectionClear}
                    allowClickWithoutSelected={true}
                    disabled={this.props.isDisabled}
                >
                    <SelectableList items={this.props.items} isDisabled={this.props.isDisabled} />
                </SelectableGroup>
            </div>
        )
    }
}

GroupSelect.defaultProps = {
    isDisabled: true,
    onSelectionClear: function(){},
    onSelectionFinish: function(){}
};

export default GroupSelect;