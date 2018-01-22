import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Body from './Body.jsx';

export default class Sampler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {value: 'none', label: 'None'},
            selectedTarget: {value: 'none', label: 'None'}
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTarget = this.handleTarget.bind(this);
    }

    handleClick(ev) {
        const { sample, actions } = this.props;
        const { selectedOption, selectedTarget } = this.state;
        actions.runProcess();
    }

    handleChange(nextOption) {
        const { sample } = this.props;
        if (nextOption.value !== 'none') {
            const initialValue = sample[nextOption.value];
            const text = initialValue.split('.').pop();
            this.setState({
                selectedOption: nextOption,
                selectedTarget: {
                    value: initialValue,
                    label: text[0].toUpperCase() + text.slice(1)
                }
            });
        } else {
            this.setState({
                selectedOption: nextOption,
                selectedTarget: {value: 'none', label: 'None'}
            });
        }
    }

    handleTarget(nextTarget) {
        this.setState({ selectedTarget: nextTarget });
    }

    render() {
        const { source, sample, process, actions } = this.props;
        const { selectedOption, selectedTarget } = this.state;
        const options = [
            {value: 'none', label: 'None'},
            {value: 'scale', label: 'Scale'},
            {value: 'network', label: 'Network'},
            {value: 'track', label: 'Track'},
            {value: 'refine', label: 'Refine'}
        ];
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
                        source={source}
                        process={process}
                        actions={actions}
                        handleTarget={this.handleTarget}
                    />
                </div>
                <div className="sampler-target">
                    <span>Key Property :</span>
                    <span className="sampler-label">{selectedTarget.label}</span>
                </div>
                <div className="sampler-btn">
                    <button type="button" onClick={this.handleClick}>Apply to Samples</button>
                </div>
            </div>
        );
    }
}

Sampler.propTypes = {
    source: PropTypes.object.isRequired,
    sample: PropTypes.object.isRequired,
    process: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
