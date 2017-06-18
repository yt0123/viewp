import React from 'react';
import PropTypes from 'prop-types';
import Bind from '../../constants/Bind';
import LogManager from '../../constants/Logger';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.map = null;
        this.logger = LogManager.getLogger('ty.edelweiss.viewp.MapComponent');
    }

    componentDidMount() {
        const { sources, config } = this.props;
        this.map = new Bind('map', sources, config);
    }

    componentDidUpdate(prevProps, prevState) {
        const { sources, config } = this.props;
        this.logger.log(sources.);
        this.logger.log(config);
        this.map.change(sources);
        this.map.update(config);
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
