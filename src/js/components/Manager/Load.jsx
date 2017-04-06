var React = require('react');
var Validation = require('../../constants/Validation.js');

var Load = React.createClass({
    propTypes: {
        actions: React.PropTypes.object.isRequired
    },
    handleClick: function(ev) {
        var { loader } = this.refs;
        var evt = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
        loader.dispatchEvent(evt);
    },
    handleChange: function(ev) {
        var { actions } = this.props;
        var file = ev.target.files[0];
        var reader = new FileReader();
        reader.onload = function(ev) {
            var format = new Validation(reader.result);
            actions.addSource(file.name, format.getResult(), format.getProperties());
        };
        reader.readAsText(file, 'UTF-8');
        ev.target.value = '';
    },
    render: function() {
        var styles = { display: 'none' };
        return (
            <div className="manager-load">
              <span onClick={this.handleClick}>Source Add +</span>
              <input ref="loader" type="file" style={styles} onChange={this.handleChange} />
            </div>
        );
    }
});

module.exports = Load;
