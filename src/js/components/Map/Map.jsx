import React from 'react';
import PropTypes from 'prop-types';
import Bind from '../../constants/Bind.js';

var map = null;

export default class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { sources, config } = this.props;
        map = new Bind('map', sources, config);
    }

    componentDidUpdate(prevProps, prevState) {
        const { sources, config } = this.props;
        console.log(sources, config);
        map.update(sources, config);
    }

    render() {
        const { sources, config, actions } = this.props;
        return (
            <div id="map" className="map">
            </div>
        );
    }
}

Map.propTypes = {
    sources: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
