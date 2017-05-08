import React from 'react';
import PropTypes from 'prop-types';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alpha: props.config.alpha,
            initColor: props.initColor,
            strokeColor: props.strokeColor,
            textAlpha: props.textAlpha,
            outlineColor: props.outlineColor
        };
        this.handleMinChange = this.handleMinChange.bind(this);
        this.handleMaxChange = this.handleMaxChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleMinChange(ev) {
        const { alpha } = this.state;
        if (Number(ev.target.value) <= alpha[1]) {
            this.setState({ alpha: [Number(ev.target.value), alpha[1]] });
        } else {
            ev.target.value = alpha[1];
        }
    }

    handleMaxChange(ev) {
        const { alpha } = this.state;
        if (Number(ev.target.value) >= alpha[0]) {
            this.setState({ alpha: [alpha[0], Number(ev.target.value)] });
        } else {
            ev.target.value = alpha[0];
        }
    }

    handleClick(ev) {
        const { config, actions } = this.props;
        const { alpha, initColor, strokeColor, textAlpha, outlineColor } = this.state;
        actions.changeAlpha(alpha);
    }

    render() {
        const { config, actions } = this.props;
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
}

List.propTypes = {
    config: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
