import React from 'react';
import PropTypes from 'prop-types';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rgb: props.config.rgb,
            alphaRange: props.config.alphaRange,
            strokeColor: props.config.strokeColor,
            textScale: props.config.textScale,
            outlineColor: props.config.outlineColor
        };
        this.handleMinChange = this.handleMinChange.bind(this);
        this.handleMaxChange = this.handleMaxChange.bind(this);
        this.handleStrokeColorChange = this.handleStrokeColorChange.bind(this);
        this.handleTextScaleChange = this.handleTextScaleChange.bind(this);
        this.handleOutlineColorChange = this.handleOutlineColorChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleMinChange(ev) {
        const { alphaRange } = this.state;
        if (Number(ev.target.value) <= alphaRange[1]) {
            this.setState({ alphaRange: [Number(ev.target.value), alphaRange[1]] });
        } else {
            ev.target.value = alphaRange[1];
        }
    }

    handleMaxChange(ev) {
        const { alphaRange } = this.state;
        if (Number(ev.target.value) >= alphaRange[0]) {
            this.setState({ alphaRange: [alphaRange[0], Number(ev.target.value)] });
        } else {
            ev.target.value = alphaRange[0];
        }
    }

    handleStrokeColorChange(ev) {
        const { strokeColor } = this.state;
        const target = ev.target.id.split("-").pop();
        switch (target) {
            case 'r':
                this.setState({ strokeColor: [Number(ev.target.value), strokeColor[1], strokeColor[2]] });
                break;

            case 'g':
                this.setState({ strokeColor: [strokeColor[0], Number(ev.target.value), strokeColor[2]] });
                break;

            case 'b':
                this.setState({ strokeColor: [strokeColor[0], strokeColor[1], Number(ev.target.value)] });
                break;

            default:
                return null;
        }
    }

    handleTextScaleChange(ev) {
        const { textScale } = this.state;
        this.setState({ textScale: Number(ev.target.value) });
    }

    handleOutlineColorChange(ev) {
        const { strokeColor } = this.state;
        const target = ev.target.id.split("-").pop();
        switch (target) {
            case 'r':
                this.setState({ strokeColor: [Number(ev.target.value), strokeColor[1], strokeColor[2]] });
                break;

            case 'g':
                this.setState({ strokeColor: [strokeColor[0], Number(ev.target.value), strokeColor[2]] });
                break;

            case 'b':
                this.setState({ strokeColor: [strokeColor[0], strokeColor[1], Number(ev.target.value)] });
                break;

            default:
                return null;
        }
    }

    handleClick(ev) {
        const { config, actions } = this.props;
        const { rgb, alphaRange, strokeColor, textScale, outlineColor } = this.state;
        actions.changeAlphaRange(alphaRange);
        actions.changeStrokeColor(strokeColor);
        actions.changeTextScale(textScale);
        actions.changeOutlineColor(outlineColor);
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
                    <input className="linearLeft" type="number" defaultValue={String(config.alphaRange[0])} min="0" max="1" step="0.1" onChange={this.handleMinChange} />
                  </span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft">Max:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input className="linearLeft" type="number" defaultValue={String(config.alphaRange[1])} min="0" max="1" step="0.1" onChange={this.handleMaxChange}/>
                  </span>
                </span>
              </li>
              <li className="setting-stroke-color linearContainer">
                <span className="setting-head linearLeft">
                  <span className="setting-box"><p>Stroke Color</p></span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft" htmlFor="stroke-color-r">R:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input id="stroke-color-r" className="linearLeft" type="number" defaultValue={String(config.strokeColor[0])} min="0" max="255" step="1" onChange={this.handleStrokeColorChange} />
                  </span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft" htmlFor="stroke-color-g">G:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input id="stroke-color-g" className="linearLeft" type="number" defaultValue={String(config.strokeColor[1])} min="0" max="255" step="1" onChange={this.handleStrokeColorChange}/>
                  </span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft" htmlFor="stroke-color-b">B:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input id="stroke-color-b" className="linearLeft" type="number" defaultValue={String(config.strokeColor[2])} min="0" max="255" step="1" onChange={this.handleStrokeColorChange}/>
                  </span>
                </span>
              </li>
              <li className="setting-text-scale linearContainer">
                <span className="setting-head linearLeft">
                  <span className="setting-box"><p>Text Scale Value</p></span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft">Scale:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input className="linearLeft" type="number" defaultValue={String(config.textScale)} min="0" max="2" step="0.1" onChange={this.handleTextScaleChange} />
                  </span>
                </span>
              </li>
              <li className="setting-outline-color linearContainer">
                <span className="setting-head linearLeft">
                  <span className="setting-box"><p>Outline Color</p></span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft" htmlFor="outline-color-r">R:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input id="outline-color-r" className="linearLeft" type="number" defaultValue={String(config.outlineColor[0])} min="0" max="255" step="1" onChange={this.handleOutlineColorChange} />
                  </span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft" htmlFor="outline-color-g">G:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input id="outline-color-g" className="linearLeft" type="number" defaultValue={String(config.outlineColor[1])} min="0" max="255" step="1" onChange={this.handleOutlineColorChange}/>
                  </span>
                </span>
                <span className="setting-label linearLeft">
                  <span className="setting-box"><label className="linearLeft" htmlFor="outline-color-b">B:</label></span>
                </span>
                <span className="setting-data linearLeft">
                  <span className="setting-box">
                    <input id="outline-color-b" className="linearLeft" type="number" defaultValue={String(config.outlineColor[2])} min="0" max="255" step="1" onChange={this.handleOutlineColorChange}/>
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
