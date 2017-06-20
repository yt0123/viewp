import React from 'react';
import PropTypes from 'prop-types';
import Mapper from '../../constants/Mapper';
import LogManager from '../../constants/Logger';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.logger = LogManager.getLogger('ty.edelweiss.viewp.MapComponent');
    }

    componentDidMount() {
        const { sources, config } = this.props;
        Mapper.fetch('map')
    }

    componentDidUpdate(prevProps, prevState) {
        const { sources, config } = this.props;
        this.logger.log(sources);
        this.logger.log(config);
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
