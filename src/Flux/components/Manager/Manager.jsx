var React = require('react');
var Body = require('./Body.jsx');

var Manager = React.createClass({
    propTypes: {
        sources: React.PropTypes.array.isRequired,
        visibility: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return { position: -8 };
    },
    resolveSetTimeout: function() {
        var { visibility } = this.props;
        var { view } = this.refs;
        var currentPixel = Number(view.style.top.slice(0,-2));
        if (visibility) {
            if (currentPixel < 55) { this.setState({ position: currentPixel+1 }); }
        } else {
            if (currentPixel > 55-view.offsetHeight) {this.setState({ position: currentPixel-1 }); }
        }
    },
    componentWillUpdate: function() {
        setTimeout(this.resolveSetTimeout, 1);
    },
    render: function() {
        var { sources, actions } = this.props;
        var { position } = this.state;
        var styles = { top: position + 'px' };
        return (
            <div ref="view" className="manager-view" style={styles}>
              <Body sources={sources} actions={actions} />
            </div>
        );
    }
});

module.exports = Manager;
