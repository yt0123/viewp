var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var Actions = require('../actions');
var Header = require('../components/Header/Header.jsx');
var Manager = require('../components/Manager/Manager.jsx');
var Map = require('../components/Map/Map.jsx');
var Setting = require('../components/Setting/Setting.jsx');

var App = function (props) {
    var { sources, config, visibility, modal, actions } = props;
    return (
            <div className="container">
              <Header visibility={visibility} modal={modal} actions={actions} />
              <Manager sources={sources} visibility={visibility} actions={actions} />
              <Setting config={config} modal={modal} actions={actions} />
              <Map sources={sources} config={config} actions={actions} />
            </div>
    );
};

App.propTypes = {
    sources: React.PropTypes.array.isRequired,
    config: React.PropTypes.object.isRequired,
    visibility: React.PropTypes.bool.isRequired,
    modal: React.PropTypes.bool.isRequired,
    actions: React.PropTypes.object.isRequired
};

var mapStateToProps = function(state) {
    return { sources: state.sources, config: state.config, visibility: state.visibility, modal: state.modal };
};

var mapDispatchToProps = function(dispatch) {
    return { actions: bindActionCreators(Actions, dispatch) };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
