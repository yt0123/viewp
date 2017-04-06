var React = require('react');

var AppSetting = React.createClass({
    propTypes: {
        modal: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    handleClick: function(ev) {
        var { actions } = this.props;
        actions.changeModal();
    },
    render: function() {
        var { modal, actions } = this.props;
        return (
            <div className="appSetting linearRight boxCenter">
              <button type="button" className="setting-toggle" onClick={this.handleClick}>
                <img src="dest/img/setting-icon.png" width="12px" height="12px" />
              </button>
            </div>
        );
    }
});

module.exports = AppSetting;
