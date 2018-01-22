import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../constants/Utils';
import { Scale, Network } from '../../constants/Algorithm';

export default class Process extends React.Component {
    constructor(props) {
        super(props);
        this.state = { completed: 0 };
        this.handleProcess = this.handleProcess.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
    }

    resolveSetInterval(token) {
        const { method, target, source, actions } = this.props;
        const { completed } = this.state;
        const currentProgress = token.getProgress();
        if (completed !== 100) {
            if (currentProgress === 100) {
                const newFeatures = token.getResult();
                const newSource = source.body;
                const newExtra = [{name: 'none', rank: 'n', type: 'Null'}];
                Array.prototype.push.apply(newExtra, Utils.treeSearch(newFeatures[0].properties));
                newSource.features = newFeatures;
                actions.changeSource(source.id, newSource, Utils.rankSortEx(newExtra, 'tmp_'));
            }
            this.setState({completed: currentProgress});
        } else {
            actions.updateProcess(completed);
        }
    }

    handleProcess() {
        const { method, target, source, actions } = this.props;
        let algorithm = null;
        switch (method) {
            case 'scale':
                const scale = new Scale(source.body.features);
                scale.calc(target);
                algorithm = scale;
                break;

            case 'network':
                const network = new Network(source.body.features);
                network.calc(target);
                algorithm = network;
                break;

            case 'track':
                console.log('track');
                break;

            case 'refine':
                console.log('track');
                break;
        }
        return algorithm;
    }

    handleProgress(chunk) {
        const { actions } = this.props;
        actions.updateProcess(chunk);
    }

    componentDidMount() {
        const token = this.handleProcess();
        this.timerId = setInterval(() => this.resolveSetInterval(token), 10);
    }

    componentWillUnmount() {
        const { method, target, source, actions } = this.props;
        const newSample = {};
        newSample[method]  = target;
        actions.changeSample(source.id, newSample);
        clearInterval(this.timerId);
    }

    render() {
        const { method, target, source, process, actions } = this.props;
        const { completed } = this.state;
        const progressText = String(completed) + '%';
        const styles = { width: progressText };
        return (
            <div className="sampler-process">
                <div className="sampler-message">
                    <h5>Target property {method} processing ... </h5>
                </div>
                <div className="sampler-progressbar">
                    <div className="sampler-progress" style={styles}>{progressText}</div>
                </div>
            </div>
        );
    }
}

Process.propTypes = {
    method: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    source: PropTypes.object.isRequired,
    process: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
