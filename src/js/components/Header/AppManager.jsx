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

/*
 * class AppManager extends React.Component {
 *     constructor(props) {
 *         super(props)
 *     }
 *     handleClick() {
 *         const { actions } = this.props;
 *         actions.changeVisibility();
 *     }
 *     render() {
 *         const { visibility } = this.props;
 *         const imageSrc = visibility ? 'dest/img/up-icon.png' : 'dest/img/down-icon.png';
 *         return (
 *             <div className="appManager linearRight boxCenter">
 *               <div className="manager-toggle linearContainer" onClick={this.handleClick}>
 *                 <span className="liearLeft">My Source</span>
 *                 <img className="linearLeft" src={imgSrc} width="12px" height="12px" />
 *               </div>
 *             </div>
 *         );
 *     }
 * }
 * /
