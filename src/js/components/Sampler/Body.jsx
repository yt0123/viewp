import React from 'react';
import PropTypes from 'prop-types';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        const { handleTarget } = this.props;
        let nextLabel = ev.target.firstChild.textContent;
        if (!ev.target.classList.contains('sample-data')) {
            nextLabel = ev.target.parentNode.firstChild.textContent;
        }
        handleTarget({
            value: nextLabel.toLowerCase(),
            label: nextLabel
        });
    }

    render() {
        const { method, target, targets, actions, handleTarget } = this.props;
        let methodContents = (<div className="none-selected">None Selected Method</div>);
        if (method !== 'none') {
            const self = this;
            methodContents = (
                <ul className="sampler-list">
                    {targets.map(function(elm, index) {
                        let classList = ['sample-data'];
                        if (target === elm.value) {
                            classList.push('active')
                        }
                        return (
                            <li key={index} className={classList.join(' ')} onClick={self.handleClick}>
                                <span className="sample-key">{elm.label}</span>
                                <span className="sample-rank">Rank: 0</span>
                                <span className="sample-type">Type: Object</span>
                            </li>
                        );
                    })}
                </ul>
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
    targets: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    handleTarget: PropTypes.func.isRequired
};
