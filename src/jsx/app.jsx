var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header/header.jsx');
var Contents = require('./contents.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {
      triggerManager: parseInt( new Date() / 1000 ),
    };
  },
  handleManager: function(ev) {
    this.setState({ triggerManager: parseInt( new Date() / 1000 ) });
  },
  render: function() {
    return (
      <div>
        <Header onClickManager={this.handleManager} />
        <Contents triggerManager={this.state.triggerManager} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
