import ol from 'openlayers';
import Config from './Config';
import Properties from './Properties';
import Utils from '../Utils';

const Factory = {
    polygonStyleFunction: function(feature) {
        const style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: Config.stroke(),
                width: 1
            }),
            fill: new ol.style.Fill({
                color: Config.fill()
            })
        });
        return style;
    },
    pointStyleFunction: function(feature) {
        const style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: Config.fill()
                })
            })
        });
        return style;
    },
    lineStyleFunction: function(feature) {
        const style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: Config.stroke(),
                width: 1
            })
        });
        return style;
    },
    polygonTextStyleFunction: function(staple) {
        const styleFunction = function(feature) {
            const style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: Config.stroke(),
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: Config.fill()
                })
            });
            if (staple !== 'none') {
                const text = Properties.fetch(staple, feature.getProperties());
                const textStyle = new ol.style.Text({
                    text: text,
                    textAlign: 'center',
                    scale: Config.scale(),
                    overflow: true,
                    fill: new ol.style.Fill({color: Config.text()}),
                    stroke: new ol.style.Stroke({color: Config.outline(), width: 2})
                });
                style.setText(textStyle);
            }
            return style;
        };
        return styleFunction;
    },
    pointTextStyleFunction: function(staple) {
        const styleFunction = function(feature) {
            const style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: Config.fill()
                    })
                })
            });
            if (staple !== 'none') {
                const text = Properties.fetch(staple, feature.getProperties());
                const textStyle = new ol.style.Text({
                    text: text,
                    textAlign: 'center',
                    scale: Config.scale(),
                    overflow: true,
                    fill: new ol.style.Fill({color: Config.text()}),
                    stroke: new ol.style.Stroke({color: Config.outline(), width: 2})
                });
                style.setText(textStyle);
            }
            return style;
        };
        return styleFunction;
    },
    lineTextStyleFunction: function(staple) {
        const styleFunction = function(feature) {
            const style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: Config.stroke(),
                    width: 1
                })
            });
            if (staple !== 'none') {
                const text = Properties.fetch(staple, feature.getProperties());
                const textStyle = new ol.style.Text({
                    text: text,
                    textAlign: 'center',
                    scale: Config.scale(),
                    overflow: true,
                    fill: new ol.style.Fill({color: Config.text()}),
                    stroke: new ol.style.Stroke({color: Config.outline(), width: 2})
                });
                style.setText(textStyle);
            }
            return style;
        };
        return styleFunction;
    },
    sampleStyleFunction(staple) {
        const styleFunction = function(feature) {
            const properties = feature.getProperties();
            const style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: Config.stroke(),
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: Config.fill(properties.scale)
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: Config.fill()
                    })
                })
            });
            if (staple !== 'none') {
                const text = Properties.fetch(staple, feature.getProperties());
                const textStyle = new ol.style.Text({
                    text: text,
                    textAlign: 'center',
                    scale: Config.scale(),
                    overflow: true,
                    fill: new ol.style.Fill({color: Config.text()}),
                    stroke: new ol.style.Stroke({color: Config.outline(), width: 2})
                });
                style.setText(textStyle);
            }
            return style;
        };
        return styleFunction;
    }
};

export default Factory;
