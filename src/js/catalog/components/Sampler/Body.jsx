import React from 'react';
import PropTypes from 'prop-types';
import Process from './Process.jsx';
import Scale from './Scale.jsx';
import Network from './Network.jsx';
import Track from './Track.jsx';
import Refine from './Refine.jsx';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { method, target, source, process, actions, handleTarget } = this.props;
        let methodContents = null;
        if (!process.isRunning) {
            switch (method) {
                case 'scale':
                    methodContents = (
                        <Scale target={target} source={source} actions={actions} handleTarget={handleTarget} />
                    );
                    break;

                case 'network':
                    methodContents = (
                        <Network target={target} source={source} actions={actions} handleTarget={handleTarget} />
                    );
                    break;

                case 'track':
                    methodContents = (
                        <Track target={target} source={source} actions={actions} handleTarget={handleTarget} />
                    );
                    break;

                case 'refine':
                    methodContents = (
                        <Refine target={target} source={source} actions={actions} handleTarget={handleTarget} />
                    );
                    break;

                default:
                    methodContents = (<div className="none-selected">None Selected Method</div>);
            }
        } else {
            methodContents = (
                <Process
                    method={method}
                    target={target}
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
    target: PropTypes.string.isRequired,
    source: PropTypes.object.isRequired,
    process: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    handleTarget: PropTypes.func.isRequired
};
