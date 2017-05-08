import React from 'react';
import PropTypes from 'prop-types';
import PickerWidget from './PickerWidget.jsx';
import PickerData from './PickerData.jsx';
import HueSlider from './HueSlider.jsx';

export default class PickerMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { base: this.props.color };
        this.handleWidget = this.handleWidget.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
        this.drawColorMap = this.drawColorMap.bind(this);
    }

    handleWidget(nextX, nextY) {
        const { canvas } = this.refs;
        const targetPixel = canvas.getContext('2d').getImageData(nextX,nextY,1,1).data;
        //this.setState({ color: [targetPixel[0], targetPixel[1], targetPixel[2]] });
        this.props.handleChange([targetPixel[0], targetPixel[1], targetPixel[2]]);
    }

    handleSlider(hue) {
        let rgb = [0, 0, 0];
        if (hue == 360) { hue = 0; }
        const max = 255, min = 0;
        if (hue < 60) {
            rgb[0] = max, rgb[1] = max * (hue / 60), rgb[2] = min;
        } else if (hue >= 60 &&  hue < 120) {
            rgb[0] = max * ((120 - hue) / 60), rgb[1] = max, rgb[2] = min;
        } else if (hue >= 120 &&  hue < 180) {
            rgb[0] = min, rgb[1] = max, rgb[2] = max * ((hue - 120) / 60);
        } else if (hue >= 180 &&  hue < 240) {
            rgb[0] = min, rgb[1] = max * ((240 - hue) / 60), rgb[2] = max;
        } else if (hue >= 240 &&  hue < 300) {
            rgb[0] = max * ((hue - 240) / 60), rgb[1] = min, rgb[2] = max;
        } else if (hue >= 300 &&  hue < 360) {
            rgb[0] = max, rgb[1] = min, rgb[2] = max * ((360 - hue) / 60);
        }
        rgb[0] = Math.round(rgb[0]);
        rgb[1] = Math.round(rgb[1]);
        rgb[2] = Math.round(rgb[2]);
        this.setState({ base: rgb });
    }

    drawColorMap() {
        const { width, height } = this.props;
        const { base } = this.state;
        let dx = { r: 1 - (base[0]/(width-1)), g: 1 - (base[1]/(width-1)), b: 1 - (base[2]/(width-1)) };
        let dy = { r: 0, g: 0, b: 0 };
        const ctx = this.refs.canvas.getContext('2d');
        for (let x = 0; x < width; x++) {
            let rgb = [255, 255, 255];
            if (dx.r != 0) { rgb[0] = 255 - Math.floor(x*dx.r); }
            if (dx.g != 0) { rgb[1] = 255 - Math.floor(x*dx.g); }
            if (dx.b != 0) { rgb[2] = 255 - Math.floor(x*dx.b); }
            dy = { r: rgb[0]/(height-1), g: rgb[1]/(height-1), b: rgb[2]/(height-1) };
            for (let y = 0; y < height; y++) {
                let style = [0, 0, 0];
                style[0] = rgb[0] - Math.floor(y*dy.r);
                style[1] = rgb[1] - Math.floor(y*dy.g);
                style[2] = rgb[2] - Math.floor(y*dy.b);
                ctx.fillStyle = 'rgb(' + style.join(',') + ')';
                ctx.fillRect(x,y,1,1);
            }
        }
    }

    componentDidMount() {
        this.drawColorMap();
    }

    componentWillUpdate(nextProps, nextState) {
        const { base } = this.state;
        if (base !== nextState.base) {
            this.drawColorMap();
        }
    }

    render() {
        const { color, handleChange, width, height } = this.props;
        const { base } = this.state;
        const binding = base.join();
        return (
            <div className="picker-body">
              <div className="picker-wrapper">
                <PickerData color={color} handleChange={handleChange} />
                <div className="rgb-colormap">
                  <canvas ref="canvas" className="colormap-tile" width={width+'px'} height={height+'px'}></canvas>
                  <PickerWidget handleChange={this.handleWidget} color={color} bind={binding} limitX={width-1} limitY={height-1} />
                </div>
              </div>
              <HueSlider handleChange={this.handleSlider} color={base} />
            </div>
        );
    }
}

PickerMap.propTypes = {
    color: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};
PickerMap.defaultProps = {
    width: 256,
    height: 86
};
