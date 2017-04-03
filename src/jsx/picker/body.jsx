var React = require('react');
var Rgb = require('./rgb');
var Widget = require('./widget.jsx');
var RgbData = require('./rgbdata.jsx');
var HueSlider = require('./hueslider.jsx');

var Body = React.createClass({
    propTypes: {
        originColor: React.PropTypes.object.isRequired,
        tileWidth: React.PropTypes.number.isRequired,
        tileHeight: React.PropTypes.number.isRequired
    },
    getDefaultProps: function() {
        return {
            originColor: new Rgb('rgb(0,0,255)'),
            tileWidth: 256,
            tileHeight: 86
        };
    },
    getInitialState: function() {
        return {
            baseColor: this.props.originColor,
            targetColor: this.props.originColor,
            targetX: 255,
            targetY: 0
        };
    },
    handleTarget: function(x, y) {
        var rgbObject = new Rgb();
        var targetPixel = this.refs.canvas.getContext('2d').getImageData(x,y,1,1).data;
        rgbObject.setRgb(targetPixel[0], targetPixel[1], targetPixel[2]);
        this.setState({ targetColor: rgbObject, targetX: x, targetY: y });
    },
    handleBase: function(rgbObjectBase) {
        this.setState({ baseColor: rgbObjectBase });
        this.drawColorMap();
        var rgbObjectTarget = new Rgb();
        var targetPixel = this.refs.canvas.getContext('2d').getImageData(this.state.targetX,this.state.targetY,1,1).data;
        rgbObjectTarget.setRgb(targetPixel[0], targetPixel[1], targetPixel[2]);
        this.setState({ targetColor: rgbObjectTarget });
    },
    drawColorMap: function() {
        var deltaX = {
            r: ((this.props.tileWidth-1) - this.state.baseColor.r)/(this.props.tileWidth-1),
            g: ((this.props.tileWidth-1) - this.state.baseColor.g)/(this.props.tileWidth-1),
            b: ((this.props.tileWidth-1) - this.state.baseColor.b)/(this.props.tileWidth-1)
        };
        var ctx = this.refs.canvas.getContext('2d');
        var rgb = new Rgb();
        for (var x = 0; x < this.props.tileWidth; x++) {
            rgb.setRgb(255, 255, 255);
            if (deltaX.r != 0) { rgb.setR(255-Math.floor(x*deltaX.r)); }
            if (deltaX.g != 0) { rgb.setG(255-Math.floor(x*deltaX.g)); }
            if (deltaX.b != 0) { rgb.setB(255-Math.floor(x*deltaX.b)); }
            var standard = rgb.getRgb();
            var deltaY = {
                r: rgb.r/(this.props.tileHeight-1),
                g: rgb.g/(this.props.tileHeight-1),
                b: rgb.b/(this.props.tileHeight-1)
            };
            for (var y = 0; y < this.props.tileHeight; y++) {
                rgb.setR(standard.r-Math.floor(y*deltaY.r));
                rgb.setG(standard.g-Math.floor(y*deltaY.g));
                rgb.setB(standard.b-Math.floor(y*deltaY.b));
                ctx.fillStyle = rgb.toString();
                ctx.fillRect(x,y,1,1);
            }
        }
    },
    componentDidMount: function() {
        this.drawColorMap();
    },
    render: function() {
        return (
            <div className="picker-body">
              <div className="picker-wrapper">
                <RgbData targetColor={this.state.targetColor}/>
                <div ref="colormap" className="rgb-colormap">
                  <canvas ref="canvas" className="colormap-tile" width={this.props.tileWidth+'px'} height={this.props.tileHeight+'px'}></canvas>
                  <Widget handleTarget={this.handleTarget} Color={this.state.targetColor} X={this.state.targetX} Y={this.state.targetY} limitX={this.props.tileWidth-1} limitY={this.props.tileHeight-1} />
                </div>
              </div>
              <HueSlider originColor={this.props.originColor} handleBase={this.handleBase} />
            </div>
        );
    }
});

module.exports = Body;
