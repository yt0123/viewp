import React from 'react';
import PropTypes from 'prop-types';
import Sampler from '../Sampler/Sampler.jsx';

export default class Bind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSample: { value: 'none', label: 'None' },
            visibility: false
        };
        this.handleActivate = this.handleActivate.bind(this);
        this.handleDeactivate = this.handleDeactivate.bind(this);
    }

    handleActivate(ev) {
        const { visibility } = this.state;
        this.setState({ visibility: !visibility });
    }

    handleDeactivate(ev) {
        this.setState({ visibility: false });
    }

    render() {
        const { source, actions } = this.props;
        const { selectedSample, visibility } = this.state;
        let DataSampler = null;
        if (visibility) {
            DataSampler = (
                <div className="sampler-popover">
                    <div className="sampler-cover" onClick={this.handleDeactivate} />
                    <Sampler source={source} actions={actions} />
                </div>
            );
        }
        return (
            <span className="bind-sampler">
                <div ref="toggle" className="sampler-toggle" onClick={this.handleActivate}>
                    <div className="sampler-text">sample</div>
                </div>
                {DataSampler}
            </span>
        );
    }
}

Bind.propTypes = {
    source: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
