import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Body from './Body.jsx';
import Assembly from './Assembly.jsx';
import SampleMethods from '../../constants/SampleMethods';

export default class Sampler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: SampleMethods.NONE,
            assembly: 'assembly',
            subAssembly: 'subAssembly'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAssembly = this.handleAssembly.bind(this);
        this.handleSubAssembly = this.handleSubAssembly.bind(this);
    }

    handleClick(ev) {
        const { sample, actions } = this.props;
        const { selectedOption, assembly } = this.state;
        actions.runProcess();
    }

    handleChange(nextOption) {
        const { sample } = this.props;
        if (nextOption.value !== 'none') {
            const initial = sample[nextOption.value];
            console.log(initial);
            this.setState({
                selectedOption: nextOption,
                assembly: initial.assembly,
                subAssembly: initial.subAssembly
            });
        } else {
            this.setState({
                selectedOption: nextOption,
                assembly: 'assembly',
                subAssembly: 'subAssembly'
            });
        }
    }

    handleAssembly(nextAssembly) {
        this.setState({ assembly: nextAssembly });
    }

    handleSubAssembly(nextSubAssembly) {
        this.setState({ subAssembly: nextSubAssembly });
    }

    render() {
        const { source, sample, process, actions } = this.props;
        const { selectedOption, assembly, subAssembly } = this.state;
        let options = [ SampleMethods.NONE, SampleMethods.SCALE ];
        switch(source.type) {
            case 'Point':
                options = options.concat([ SampleMethods.LINK, SampleMethods.TRACK ]);
                break;

            case 'LineString':
                options = options.concat([ SampleMethods.ORIENT ]);
                break;

            case 'Polygon':
                options = options.concat([ SampleMethods.SPREAD ]);
                break;
        }
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
                        assembly={assembly}
                        subAssembly={subAssembly}
                        source={source}
                        process={process}
                        actions={actions}
                        handleAssembly={this.handleAssembly}
                        handleSubAssembly={this.handleSubAssembly}
                    />
                </div>
                <div className="sampler-target">
                    <Assembly
                        assembly={assembly}
                        subAssembly={subAssembly}
                        actions={actions}
                    />
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
