import React from 'react';
import PropTypes from 'prop-types';
import Process from './Process.jsx';

export default class Track extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubClick = this.handleSubClick.bind(this);
    }

    handleClick(ev) {
        const { handleAssembly } = this.props;
        const nextAssembly = ev.target.id ? ev.target.id : ev.target.parentNode.id;
        handleAssembly(nextAssembly);
    }

    handleSubClick(ev) {
        const { handleSubAssembly } = this.props;
        const nextSubAssembly = ev.target.id ? ev.target.id : ev.target.parentNode.id;
        handleSubAssembly(nextSubAssembly);
    }

    render() {
        const { assembly, subAssembly, source, actions, handleAssembly } = this.props;
        const self = this;
        return (
            <div className="sampler-table">
                <div className="sampler-row">
                    <ul className="sampler-list">
                        {source.extra.filter(function(elm, index) {
                            if (elm.name.split('.')[0] !== 'tmp_') {
                                return elm.type === 'Number' || elm.type === 'String' || elm.type === 'Null';
                            }
                        }).map(function(elm, index) {
                            const text = elm.name.split('.').pop();
                            let classList = ['sample-data', 'assembly'];
                            if (assembly === elm.name) {
                                classList.push('active');
                            }
                            return (
                                <li key={index} id={elm.name} className={classList.join(' ')} onClick={self.handleClick}>
                                    <span className="sample-key">{text[0].toUpperCase() + text.slice(1)}</span>
                                    <span className="sample-rank">Rank: {elm.rank}</span>
                                    <span className="sample-type">Type: {elm.type}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="sampler-row">
                    <ul className="sampler-list">
                        {source.extra.filter(function(elm, index) {
                            if (elm.name.split('.')[0] !== 'tmp_') {
                                return elm.type === 'Number' || elm.type === 'String' || elm.type === 'Null';
                            }
                        }).map(function(elm, index) {
                            const text = elm.name.split('.').pop();
                            let classList = ['sample-data', 'sub-assembly'];
                            if (subAssembly === elm.name) {
                                classList.push('active');
                            }
                            return (
                                <li key={index} id={elm.name} className={classList.join(' ')} onClick={self.handleSubClick}>
                                    <span className="sample-key">{text[0].toUpperCase() + text.slice(1)}</span>
                                    <span className="sample-rank">Rank: {elm.rank}</span>
                                    <span className="sample-type">Type: {elm.type}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

Track.propTypes = {
    assembly: PropTypes.string.isRequired,
    subAssembly: PropTypes.string.isRequired,
    source: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    handleAssembly: PropTypes.func.isRequired
};
