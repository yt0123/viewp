var React = require('react');
var Source = require('./source.jsx');

var Store = React.createClass({
  propTypes: {
    store: React.PropTypes.array.isRequired,
  },
  render: function() {
    var Sources = [];
    for (var index in this.props.store) {
      Sources.push(
        <li key={index} className="store-list">
          <Source source={this.props.store[index]} />
        </li>
      );
    }
    var style = this.props.store.length > 0 ? {display: 'none'} : {display: 'block'} ;
    return (
      <ul className="manager-store">
        <li className="store-none" style={style}>None Source</li>
        {Sources}
      </ul>
    );
  }
});

module.exports = Store;
