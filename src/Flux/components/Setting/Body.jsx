var React = require('react');
var List = require('./List.jsx');

var Body = React.createClass({
    propTypes: {
        config: React.PropTypes.object.isRequired,
        modal: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    handleClick: function(ev) {
        var { actions } = this.props;
        actions.changeModal();
    },
    render: function() {
        var { config, modal, actions } = this.props;
        return (
            <div className="setting-wrap">
              <div className="setting-menu">
                <button className="setting-close" onClick={this.handleClick}>
                  <img src="./dest/img/destroy-icon.png" width="12px" height="12px" />
                </button>
                <List config={config} actions={actions} />
              </div>
            </div>
        );
    }
});

module.exports = Body;
