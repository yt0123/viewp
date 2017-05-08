import React from 'react';
import PropTypes from 'prop-types';

export default class HueSliderWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, widgetX: null };
        this.handleDnD = this.handleDnD.bind(this);
    }

    handleDnD(event) {
        const self = this;
        const { handleChange, limit } = this.props;
        const { x, widgetX } = this.state;
        const { widget } = this.refs;

        switch(event.type) {

        case 'mousedown':
            self.setState({ widgetX: event.pageX - widget.offsetLeft });
            document.body.addEventListener('mousemove', self.handleDnD, false);
            break;

        case 'mousemove':
            event.preventDefault();
            let nextX = event.pageX - widgetX;
            if (nextX > x) {
                nextX = nextX > limit ? limit : nextX ;
            } else if (nextX < x) {
                nextX = nextX < 0 ? 0 : nextX;
            }
            handleChange((nextX/limit)*360);
            self.setState({ x: nextX });
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

    componentWillMount() {
        const { color, limit } = this.props;
        const max = Math.max(color[0], color[1], color[2]), min = Math.min(color[0], color[1], color[2]);
        let initX = 0;
        if (max !== min) {
            if (max == color[0]) initX = 60 * (color[1] - color[2]) / (max-min);
            if (max == color[1]) initX = 60 * (color[2] - color[0]) / (max-min) + 120;
            if (max == color[2]) initX = 60 * (color[0] - color[1]) / (max-min) + 240;
        }
        initX = initX < 0 ? initX + 360 : initX ;
        this.setState({ x: Math.round((initX/360)*limit) });
    }

    render() {
        const { color } = this.props;
        const { x } = this.state;
        const styles = { backgroundColor: 'rgb(' + color.join(',') + ')', left: x + 'px' };
        return (
            <div ref="widget" className="slider-widget" onMouseDown={this.handleDnD} style={styles}></div>
        );
    }
}

HueSliderWidget.propTypes = {
    color: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired
};
