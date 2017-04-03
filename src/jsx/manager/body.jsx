var React = require('react');
var Store = require('./store.jsx');
var Load = require('./load.jsx');

var Body = React.createClass({
  getInitialState: function() {
    return {
      store: []
    };
  },
  handleSource: function(ev) {
    var file = ev.target.files[0];
    this.setState({ store: this.state.store.concat([file]) });
  },
  handleLoad: function() {
    var evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    this.refs.loader.dispatchEvent(evt);
  },
  render: function() {
    return (
      <div className="manager-body">
        <Store store={this.state.store} onClickPicker={this.props.onClickPicker} />
        <Load handleLoad={this.handleLoad} />
        <input ref="loader" type="file" style={{display: "none"}} onChange={this.handleSource} />
      </div>
    );
  }
});

module.exports = Body;
