import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Body from './Body.jsx';

export default class Sampler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {value: 'none', label: 'None'},
            selectedTarget: {value: 'none', label: 'None' }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTarget = this.handleTarget.bind(this);
    }

    handleChange(nextOption) {
        this.setState({ selectedOption: nextOption });
    }

    handleTarget(nextTarget) {
        this.setState({ selectedTarget: nextTarget });
    }

    render() {
        const { source, actions } = this.props;
        const { selectedOption, selectedTarget } = this.state;
        const options = [
            {value: 'none', label: 'None'},
            {value: 'scale', label: 'Scale'},
            {value: 'link', label: 'Link'}
        ];
        const targets = source.extra['category'].map(function(elm) {
            return {
                value: elm,
                label: elm[0].toUpperCase() + elm.slice(1)
            };
        });
        return (
            <div className="sampler-view">
                <div className="sampler-method">
                    <h3>Sample Method</h3>
                    <Select
                        name="method-select"
                        value={selectedOption.value}
                        options={options}
                        autosize={false}
                        clearable={false}
                        searchable={false}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="sampler-body">
                    <Body
                        method={selectedOption.value}
                        target={selectedTarget.value}
                        targets={targets}
                        actions={actions}
                        handleTarget={this.handleTarget}
                    />
                </div>
                <div className="sampler-target">
                    <span>Key Property :</span>
                    <span className="sampler-label">{selectedTarget.label}</span>
                </div>
                <div className="sampler-btn">
                    <button type="button">Apply to Samples</button>
                </div>
            </div>
        );
    }
}

Sampler.propTypes = {
    source: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
