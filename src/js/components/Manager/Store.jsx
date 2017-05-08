import React from 'react';
import PropTypes from 'prop-types';
import Source from './Source.jsx';

export default class Store extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sources, actions } = this.props;

        let Sources = [];
        for (var index in sources) {
            Sources.push(
                <li key={index} className="store-list">
                  <Source source={sources[index]} actions={actions} />
                </li>
            );
        }
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
    actions: PropTypes.object.isRequired
};
