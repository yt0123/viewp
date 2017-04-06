var React = require('react');
var PickerWidget = require('./PickerWidget.jsx');
var PickerData = require('./PickerData.jsx');
var HueSlider = require('./HueSlider.jsx');

var PickerMap = React.createClass({
    propTypes: {
        color: React.PropTypes.array.isRequired,
        handleChange: React.PropTypes.func.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired
    },
    getDefaultProps: function() {
        return { width: 256, height: 86 };
    },
    getInitialState: function() {
        return { base: this.props.color };
    },
    handleWidget: function(nextX, nextY) {
        var { canvas } = this.refs;
        var targetPixel = canvas.getContext('2d').getImageData(nextX,nextY,1,1).data;
        //this.setState({ color: [targetPixel[0], targetPixel[1], targetPixel[2]] });
        this.props.handleChange([targetPixel[0], targetPixel[1], targetPixel[2]]);
    },
    handleSlider: function(hue) {
        var rgb = [0, 0, 0];
        if (hue == 360) { hue = 0; }
        var max = 255, min = 0;
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
    },
    drawColorMap: function() {
        var { width, height } = this.props;
        var { base } = this.state;
        var dx = { r: 1 - (base[0]/(width-1)), g: 1 - (base[1]/(width-1)), b: 1 - (base[2]/(width-1)) };
        var dy = { r: 0, g: 0, b: 0 };
        var ctx = this.refs.canvas.getContext('2d');
        for (var x = 0; x < width; x++) {
            var rgb = [255, 255, 255];
            if (dx.r != 0) { rgb[0] = 255 - Math.floor(x*dx.r); }
            if (dx.g != 0) { rgb[1] = 255 - Math.floor(x*dx.g); }
            if (dx.b != 0) { rgb[2] = 255 - Math.floor(x*dx.b); }
            dy = { r: rgb[0]/(height-1), g: rgb[1]/(height-1), b: rgb[2]/(height-1) };
            for (var y = 0; y < height; y++) {
                var style = [0, 0, 0];
                style[0] = rgb[0] - Math.floor(y*dy.r);
                style[1] = rgb[1] - Math.floor(y*dy.g);
                style[2] = rgb[2] - Math.floor(y*dy.b);
                ctx.fillStyle = 'rgb(' + style.join(',') + ')';
                ctx.fillRect(x,y,1,1);
            }
        }
    },
    componentDidMount: function() {
        this.drawColorMap();
    },
    componentWillUpdate: function(nextProps, nextState) {
        var { base } = this.state;
        if (base !== nextState.base) {
            this.drawColorMap();
        }
    },
    render: function() {
        var { color, handleChange, width, height } = this.props;
        var { base } = this.state;
        var binding = base.join();
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
});

module.exports = PickerMap;
