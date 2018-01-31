import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../constants/Utils';
import { Scale, Link, Track, Orient } from '../../constants/Algorithm';

export default class Process extends React.Component {
    constructor(props) {
        super(props);
        this.state = { completed: 0 };
        this.handleProcess = this.handleProcess.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
    }

    resolveSetInterval(token) {
        const { source, actions } = this.props;
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
        const { method, assembly, subAssembly, source, actions } = this.props;
        let algorithm = null;
        switch (method) {
            case 'scale':
                algorithm = new Scale(source.body.features);
                algorithm.calc(assembly);
                break;

            case 'link':
                algorithm = new Link(source.body.features);
                algorithm.calc(assembly);
                break;

            case 'track':
                algorithm = new Track(source.body.features);
                algorithm.calc(assembly, subAssembly);
                break;

            case 'orient':
                algorithm = new Orient(source.body.features);
                algorithm.calc(assembly);
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
        const { method, assembly, subAssembly, source, actions } = this.props;
        const newSample = {};
        if (!subAssembly) {
            newSample[method] = { assembly };
        } else {
            newSample[method] = { assembly, subAssembly };
        }
        actions.changeSample(source.id, newSample);
        clearInterval(this.timerId);
    }

    render() {
        const { method, assembly, subAssembly, source, process, actions } = this.props;
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
    assembly: PropTypes.string.isRequired,
    source: PropTypes.object.isRequired,
    process: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
