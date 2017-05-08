import React from 'react';
import PropTypes from 'prop-types';
import Body from './Body.jsx';

export default class Setting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { config, modal, actions } = this.props;
        const style = modal ? { display: 'block' } : { display: 'none' };
        return (
            <div className="setting-view" style={style}>
              <Body config={config} modal={modal} actions={actions} />
            </div>
        );
    }
}

Setting.propTypes = {
    config: PropTypes.object.isRequired,
    modal: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};
