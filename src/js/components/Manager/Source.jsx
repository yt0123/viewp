import React from 'react';
import PropTypes from 'prop-types';
import BindPicker from './BindPicker.jsx';
import BindSelect from './BindSelect.jsx';
import BindSampler from './BindSampler.jsx';

export default class Source extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleStaple = this.handleStaple.bind(this);
        this.handleColor = this.handleColor.bind(this);
    }

    handleCheck(ev) {
        const { source, actions } = this.props;
        actions.checkSource(source.id);
    }

    handleDelete(ev) {
        const { source, actions } = this.props;
        actions.deleteSource(source.id);
    }

    handleStaple(staple) {
        const { source, actions } = this.props;
        actions.stapleSource(source.id, staple);
    }

    handleColor(color) {
        const { source, actions } = this.props;
        actions.colorSource(source.id, color);
    }

    render() {
        const { source, actions } = this.props;
        const options = source.extra.map(function(elm) {
            const text = elm.name.split('.').pop();
            return {
                value: elm.name,
                label: '[' + String(elm.rank) + '] ' + text[0].toUpperCase() + text.slice(1)
            };
        });
        return (
            <span className="source-wrapper">
              <span className="source-statebox widgetLeft">
                  <input type="checkbox" defaultChecked="checked" onChange={this.handleCheck} />
              </span>
              <span className="source-namebox widgetLeft">{source.name}</span>
              <span className="source-destroybox widgetRight" onClick={this.handleDelete}>
                  <img src="img/destroy-icon.png" />
              </span>
              <span className="source-selectbox widgetRight">
                  <BindSelect options={options} handleChange={this.handleStaple} />
              </span>
              <span className="source-colorbox widgetRight">
                  <BindPicker defaultValue={source.color} handleChange={this.handleColor} />
              </span>
              <span className="source-samplebox widgetRight">
                  <BindSampler source={source} actions={actions} />
              </span>
            </span>
        );
    }
}

Source.propTypes = {
    source: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
