var React = require('react');
var Body = require('./Body.jsx');

var Setting = React.createClass({
    propTypes: {
        config: React.PropTypes.object.isRequired,
        modal: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    render: function() {
        var { config, modal, actions } = this.props;
        var style = modal ? { display: 'block' } : { display: 'none' };
        return (
            <div className="setting-view" style={style}>
              <Body config={config} modal={modal} actions={actions} />
            </div>
        );
    }
});

module.exports = Setting;
