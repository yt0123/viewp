import ol from 'openlayers';
import ActionTypes from '../Actiontypes';
import Config from './MapConfig';

const property = { none: [-1] };

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
                fill: new ol.style.Fill({color: Config.fill()}),
                stroke: new ol.style.Stroke({color: Config.fill(), width: 2})
            })
        });
        return style;
    },
    createPropFunction: function(id, properties) {
        console.log(id);
        for (let i = 0; i < properties[0].length; i++) {
            if (properties[0][i] in property) {
                property[properties[0][i]].push(id);
            } else {
                const list = document.createElement('li');
                list.innerHTML = properties[0][i];
                list.id = properties[0][i];
                console.log(properties[1][i]);
                list.setAttribute('value', properties[1][i]);
                list.addEventListener('click', function(ev) {
                    document.getElementsByClassName('target-property')[0].innerHTML = this.innerHTML;
                    document.getElementsByClassName('properties')[0].classList.remove('active');
                });
            document.getElementsByClassName('properties')[0].appendChild(list);
            }
        }
    },
    deletePropFunction: function(id) {
        console.log(id);
        const elm = document.getElementsByClassName('properties')[0];
        for (let key in property) {
            const index = property[key].indexOf(id);
            if (index >= 0) {
                property[key].pop(index);
                if (property[key].length == 0) {
                    elm.removeChild(document.getElementById(key));
                    delete property[key];
                }
            }
        }
    },
    alphaFunction: function(feature) {}
};

export default Factory;
