import React from 'react';
import PropTypes from 'prop-types';
import Source from './Source.jsx';

export default class Store extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sources, samples, process, actions } = this.props;

        const Sources = sources.map(function(source, index) {
            return (
                <li key={index} className="store-list">
                  <Source source={source} sample={samples[index]} process={process} actions={actions} />
                </li>
            );
        });
        const styles = sources.length > 0 ? { display: 'none' } : { display: 'block' } ;

        return (
            <ul className="manager-store">
              <li className="store-none" style={styles}>None Source</li>
              {Sources}
            </ul>
        );
    }
}

Store.propTypes = {
    sources: PropTypes.array.isRequired,
    samples: PropTypes.array.isRequired,
    process: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
