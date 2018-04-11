import React, { Component } from 'react'
import { object, bool } from 'prop-types'
import getBoundsForNode from './getBoundsForNode'

const createSelectable = WrappedComponent => (
    class SelectableItem extends Component {
        static propTypes = {
            selected: bool,
        };

        static defaultProps = {
            selected: false,
        };

        static contextTypes = {
            selectable: object,
        };

        state = {
            selected: this.props.selected,
            selecting: false,
        };

        componentDidMount() {
            this.registerSelectable()
        }

        registerSelectable = containerScroll => {
            this.bounds = getBoundsForNode(this.node, containerScroll);
            this.context.selectable.register(this)
        };

        componentWillUnmount() {
            this.context.selectable.clearSelection();
            this.context.selectable.unregister(this);
        }

        selectableRef = ref => this.node = ref;

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    selected={this.state.selected}
                    selecting={this.state.selecting}
                    selectableRef={this.selectableRef}
                />
            )
        }
    }
);

export default createSelectable