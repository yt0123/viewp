import React from 'react';
import PropTypes from 'prop-types';
import Process from './Process.jsx';
import Scale from './Scale.jsx';
import Subset from './Subset.jsx';
import Link from './Link.jsx';
import Track from './Track.jsx';
import Orient from './Orient.jsx';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { method, assembly, subAssembly, source, process, actions, handleAssembly, handleSubAssembly } = this.props;
        let methodContents = null;
        if (!process.isRunning) {
            switch (method) {
                case 'scale':
                    methodContents = (
                        <Scale assembly={assembly} source={source} actions={actions} handleAssembly={handleAssembly} />
                    );
                    break;

                case 'subset':
                    methodContents = (
                        <Subset assembly={assembly} subAssembly={subAssembly} source={source} actions={actions} handleAssembly={handleAssembly} handleSubAssembly={handleSubAssembly} />
                    );
                    break;

                case 'link':
                    methodContents = (
                        <Link assembly={assembly} source={source} actions={actions} handleAssembly={handleAssembly} />
                    );
                    break;

                case 'track':
                    methodContents = (
                        <Track assembly={assembly} subAssembly={subAssembly} source={source} actions={actions} handleAssembly={handleAssembly} handleSubAssembly={handleSubAssembly} />
                    );
                    break;

                case 'orient':
                    methodContents = (
                        <Orient assembly={assembly} source={source} actions={actions} handleAssembly={handleAssembly} />
                    );
                    break;

                default:
                    methodContents = (<div className="none-selected">None Selected Method</div>);
            }
        } else {
            methodContents = (
                <Process
                    method={method}
                    assembly={assembly}
                    subAssembly={subAssembly}
                    source={source}
                    process={process}
                    actions={actions}
                />
            );
        }
        return (
            <div className="sampler-wrap">
                {methodContents}
            </div>
        );
    }
}

Body.propTypes = {
    method: PropTypes.string.isRequired,
    assembly: PropTypes.string.isRequired,
    source: PropTypes.object.isRequired,
    process: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    handleAssembly: PropTypes.func.isRequired,
    handleSubAssembly: PropTypes.func.isRequired
};
