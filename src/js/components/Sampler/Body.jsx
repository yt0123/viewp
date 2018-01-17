import React from 'react';
import PropTypes from 'prop-types';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        const { handleTarget } = this.props;
        let nextTarget = { value: ev.target.id, label: ev.target.firstChild.textContent };
        if (!nextTarget.value) {
            nextTarget.value = ev.target.parentNode.id;
            nextTarget.label = ev.target.parentNode.firstChild.textContent;
        }
        handleTarget(nextTarget);
    }

    render() {
        const { method, target, targets, actions, handleTarget } = this.props;
        let methodContents = (<div className="none-selected">None Selected Method</div>);
        if (method !== 'none') {
            const self = this;
            methodContents = (
                <ul className="sampler-list">
                    {targets.map(function(elm, index) {
                        const text = elm.name.split('.').pop();
                        let classList = ['sample-data'];
                        if (target === elm.name) {
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
