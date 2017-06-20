import ol from 'openlayers';
import ActionTypes from '../Actiontypes';
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
    updatePropFunction: function() {
        const element = document.getElementsByClassName('properties')[0];
        while (element.firstChild) element.removeChild(element.firstChild);
        for (let i = 0; i < Properties.getNames().length; i++) {
            const list = document.createElement('li');
            list.innerHTML = Properties.getNames()[i];
            list.id = i;
            list.addEventListener('click', function(ev) {
                document.getElementsByClassName('target-property')[0].innerHTML = this.innerHTML;
                document.getElementsByClassName('properties')[0].classList.remove('active');
            });
            element.appendChild(list);
        }
    }
};

export default Factory;
