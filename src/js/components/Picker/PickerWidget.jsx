var React = require('react');

var PickerWidget = React.createClass({
    propTypes: {
        color: React.PropTypes.array.isRequired,
        bind: React.PropTypes.string.isRequired,
        limitX: React.PropTypes.number.isRequired,
        limitY: React.PropTypes.number.isRequired,
        handleChange: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            x: this.props.limitX, y: 0,
            widgetX: null, widgetY: null
        };
    },
    handleDnD: function(event) {
        var self = this;
        var { handleChange, limitX, limitY } = this.props;
        var { x, y, widgetX, widgetY } = this.state;
        var { widget } = this.refs;

        switch(event.type) {

        case 'mousedown':
            self.setState({ widgetX: event.pageX - widget.offsetLeft, widgetY: event.pageY - widget.offsetTop });
            document.body.addEventListener('mousemove', self.handleDnD, false);
            break;

        case 'mousemove':
            event.preventDefault();
            var nextX = event.pageX - widgetX;
            var nextY = event.pageY - widgetY;
            if (nextX > x) {
                nextX = nextX > limitX ? limitX : nextX;
            } else if (nextX < x){
                nextX = nextX < 0 ? 0 : nextX;
            }
            if (nextY > y) {
                nextY = nextY > limitY ? limitY: nextY;
            } else if (nextY < y) {
                nextY = nextY < 0 ? 0 : nextY;
            }
            self.setState({ x: nextX, y: nextY });
            document.body.addEventListener('mouseup', self.handleDnD, false);
            document.body.addEventListener('mouseleave', self.handleDnD, false);
            break;

        case 'mouseup':
            document.body.removeEventListener('mousemove', self.handleDnD, false);
            document.body.removeEventListener('mouseup', self.handleDnD, false);
            document.body.removeEventListener("mouseleave", self.handleDnD, false);
            break;

        case 'mouseleave':
            document.body.removeEventListener('mousemove', self.handleDnD, false);
            document.body.removeEventListener('mouseup', self.handleDnD, false);
            document.body.removeEventListener("mouseleave", self.handleDnD, false);
            break;

        }
    },
    componentWillUpdate: function(nextProps, nextState) {
        var { bind, handleChange } = this.props;
        var { x, y } = this.state;
        if (x !== nextState.x || y !== nextState.y || bind !== nextProps.bind) {
            handleChange(nextState.x, nextState.y);
        }
    },
    render: function() {
        var { color } = this.props;
        var { x, y } = this.state;
        var style = { backgroundColor: 'rgb(' + color.join(',') + ')', left: x + 'px', top: y + 'px' };
        return (
            <div ref="widget" className="colormap-widget" onMouseDown={this.handleDnD} style={style}></div>
        );
    }
});

module.exports = PickerWidget;
