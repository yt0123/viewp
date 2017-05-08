import React from 'react';
import PropTypes from 'prop-types';

export default class PickerWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.limitX, y: 0,
            widgetX: null, widgetY: null
        };
        this.handleDnD = this.handleDnD.bind(this);
    }

    handleDnD(event) {
        const self = this;
        const { handleChange, limitX, limitY } = this.props;
        const { x, y, widgetX, widgetY } = this.state;
        const { widget } = this.refs;

        switch(event.type) {

        case 'mousedown':
            self.setState({ widgetX: event.pageX - widget.offsetLeft, widgetY: event.pageY - widget.offsetTop });
            document.body.addEventListener('mousemove', self.handleDnD, false);
            break;

        case 'mousemove':
            event.preventDefault();
            let nextX = event.pageX - widgetX;
            let nextY = event.pageY - widgetY;
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
    }

    componentWillUpdate(nextProps, nextState) {
        const { bind, handleChange } = this.props;
        const { x, y } = this.state;
        if (x !== nextState.x || y !== nextState.y || bind !== nextProps.bind) {
            handleChange(nextState.x, nextState.y);
        }
    }

    render() {
        const { color } = this.props;
        const { x, y } = this.state;
        const style = { backgroundColor: 'rgb(' + color.join(',') + ')', left: x + 'px', top: y + 'px' };
        return (
            <div ref="widget" className="colormap-widget" onMouseDown={this.handleDnD} style={style}></div>
        );
    }
}

PickerWidget.propTypes = {
    color: PropTypes.array.isRequired,
    bind: PropTypes.string.isRequired,
    limitX: PropTypes.number.isRequired,
    limitY: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired
};
