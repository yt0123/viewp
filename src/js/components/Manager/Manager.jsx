import React from 'react';
import PropTypes from 'prop-types';
import Body from './Body.jsx';

export default class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = { position: -8 };
        this.resolveSetTimeout = this.resolveSetTimeout.bind(this);
    }

    resolveSetTimeout() {
        const { visibility } = this.props;
        const { view } = this.refs;
        const currentPixel = Number(view.style.top.slice(0,-2));
        if (visibility) {
            if (currentPixel < 55) { this.setState({ position: currentPixel+1 }); }
        } else {
            if (currentPixel > 55-view.offsetHeight) {this.setState({ position: currentPixel-1 }); }
        }
    }

    componentWillUpdate() {
        setTimeout(this.resolveSetTimeout, 1);
    }

    render() {
        const { sources, actions } = this.props;
        const { position } = this.state;
        const styles = { top: position + 'px' };
        return (
            <div ref="view" className="manager-view" style={styles}>
              <Body sources={sources} actions={actions} />
            </div>
        );
    }
}

Manager.propTypes = {
    sources: PropTypes.array.isRequired,
    visibility: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};
