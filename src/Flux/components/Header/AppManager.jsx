var React = require('react');

var AppManager = React.createClass({
    propTypes: {
        visibility: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    handleClick: function(ev) {
        var { actions } = this.props;
        actions.changeVisibility();
    },
    render: function() {
        var { visibility } = this.props;
        var imageSrc = visibility ? 'dest/img/up-icon.png' : 'dest/img/down-icon.png' ;
        return (
            <div className="appManager linearRight boxCenter">
              <div className="manager-toggle linearContainer" onClick={this.handleClick}>
                <span className="linearLeft">My Source</span>
                <img className="linearLeft" src={imageSrc} width="12px" height="12px" /> ;
              </div>
            </div>
        );
    }
});

module.exports = AppManager;

