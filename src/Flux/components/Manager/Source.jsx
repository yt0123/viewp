var React = require('react');
var BindPicker = require('./BindPicker.jsx');

var Source = React.createClass({
    propTypes: {
        source: React.PropTypes.object.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    handleCheck: function(ev) {
        var { source, actions } = this.props;
        actions.checkSource(source.id);
    },
    handleDelete: function(ev) {
        var { source, actions } = this.props;
        actions.deleteSource(source.id);
    },
    handleStaple: function(ev) {
        var { source, actions } = this.props;
        actions.stapleSource(source.id, ev.target.value);
    },
    handleColor: function(color) {
        var { source, actions } = this.props;
        actions.colorSource(source.id, color);
    },
    render: function() {
        var { source, actions } = this.props;
        var staples = source.extra[0].map(function(elm, index) { return <option key={index}>{elm}</option>; });
        return (
            <span className="source-wrapper">
              <span className="source-statebox widgetLeft">
                <input type="checkbox" defaultChecked="checked" onChange={this.handleCheck} />
              </span>
              <span className="source-namebox widgetLeft">{source.name}</span>
              <span className="source-destroybox widgetRight" onClick={this.handleDelete}>
                <img src="dest/img/destroy-icon.png" />
              </span>
              <span className="source-colorbox widgetRight">
                <BindPicker defaultValue={source.color} handleChange={this.handleColor} />
              </span>
              <span className="source-staplebox widgetRight">
                <select onChange={this.handleStaple}>
                  {staples}
                </select>
              </span>
            </span>
        );
    }
});

module.exports = Source;
