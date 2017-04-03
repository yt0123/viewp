var React = require('react');

var List = React.createClass({
    propTypes: {
        config: React.PropTypes.object.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            alpha: this.props.config.alpha,
            initColor: this.props.initColor,
            strokeColor: this.props.strokeColor,
            textAlpha: this.props.textAlpha,
            outlineColor: this.props.outlineColor
        };
    },
    handleMinChange: function(ev) {
        var { alpha } = this.state;
        if (Number(ev.target.value) <= alpha[1]) {
            this.setState({ alpha: [Number(ev.target.value), alpha[1]] });
        } else {
            ev.target.value = alpha[1];
        }
    },
    handleMaxChange: function(ev) {
        var { alpha } = this.state;
        if (Number(ev.target.value) >= alpha[0]) {
            this.setState({ alpha: [alpha[0], Number(ev.target.value)] });
        } else {
            ev.target.value = alpha[0];
        }
    },
    handleClick: function(ev) {
        var { config, actions } = this.props;
        var { alpha, initColor, strokeColor, textAlpha, outlineColor } = this.state;
        actions.changeAlpha(alpha);
    },
    render: function() {
        var { config, actions } = this.props;
        return (
            <ul className="setting-list">
              <li className="setting-alpha linearContainer">
                <span className="setting-head linearLeft">
                  <span className="setting-box"><p>Alpha Value</p></span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft">Min:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input className="linearLeft" type="number" defaultValue={String(config.alpha[0])} min="0" max="1" step="0.1" onChange={this.handleMinChange} />
                  </span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft">Max:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input className="linearLeft" type="number" defaultValue={String(config.alpha[1])} min="0" max="1" step="0.1" onChange={this.handleMaxChange}/>
                  </span>
                </span>
              </li>
              <li className="setting-btn">
                <button onClick={this.handleClick}>Apply</button>
              </li>
            </ul>
        );
    }
});

module.exports = List;
