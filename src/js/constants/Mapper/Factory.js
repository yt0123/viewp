import ol from 'openlayers';
import Config from './Config';
import Properties from './Properties';

const Factory = {
    styleFunction: function(feature) {
        const style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: Config.stroke(),
                width: 1
            }),
            fill: new ol.style.Fill({
                color: Config.fill()
            }),
            text: new ol.style.Text({
                textAlign: 'center',
                scale: Config.scale(),
                fill: new ol.style.Fill({color: Config.text()}),
                stroke: new ol.style.Stroke({color: Config.outline(), width: 2})
            })
        });
        return style;
    },
};

export default Factory;
