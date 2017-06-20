import ol from 'openlayers';
import ActionTypes from '../Actiontypes';
import Properties from './Properties';
import Factory from './Factory';

let activateCache = [];

const PropViewControl = function(opt_options) {
    const options = opt_options || {};
    const lists = document.createElement('ul');
    lists.classList.add('properties');
    lists.innerHTML = '<li id=\'0\' value>none</li>';
    const self = this;
    lists.firstElementChild.addEventListener('click', function(ev) {
        document.getElementsByClassName('target-property')[0].innerHTML = this.innerHTML;
        document.getElementsByClassName('properties')[0].classList.remove('active');
    });
    const button = document.createElement('button');
    button.classList.add('target-property');
    button.innerHTML = 'none';
    button.addEventListener('click', handlePropView, false);
    function handlePropView(ev) {
        const props = document.getElementsByClassName('properties')[0];
        if (props.classList.contains('active')) {
                props.classList.remove('active');
        } else {
            props.classList.add('active');
        }
    };
    const element = document.createElement('div');
    element.className = 'prop-view ol-unselectable ol-control';
    element.appendChild(lists);
    element.appendChild(button);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(PropViewControl, ol.control.Control);

const PropViewAllControl = function(opt_options) {
    const options = opt_options || {};
    const button = document.createElement('button');
    button.classList.add('all-property');
    const img = document.createElement('img');
    img.setAttribute('src', 'dest/img/search-icon-out.png');
    img.setAttribute('width', '10.5px');
    img.setAttribute('height', '10.5px');
    button.addEventListener('click', handlePropViewAll, false);
    const self = this;
    function handlePropViewAll(ev) {
        const target = document.getElementsByClassName('target-property')[0].innerHTML;
        const accessLayers = self.getMap().getLayers().getArray();
        const allProp = document.getElementsByClassName('all-property')[0];
        if (allProp.classList.contains('active')) {
            allProp.classList.remove('active');
            if (activateCache.length > 0) {
                for (let i = accessLayers.length-1; i > 0; i--) { accessLayers[i].setStyle(activateCache.pop()); }
            }
            allProp.firstElementChild.setAttribute('src', 'dest/img/search-icon-out.png');
        } else if (target !== 'none') {
            allProp.classList.add('active');
            for (let i = 1; i < accessLayers.length; i++) {
                const styleFunction = accessLayers[i].getStyle();
                const targetFunction = function(feature) {
                    const style = styleFunction(feature);
                    const accessor = Properties.deploy(i - 1, target);
                    let label = feature.getProperties();
                    accessor.forEach(function (elm, index) { label = label[elm]; });
                    style.getText().setText(String(label));
                    return style;
                };
                activateCache.push(styleFunction);
                accessLayers[i].setStyle(targetFunction);
            }
            allProp.firstElementChild.setAttribute('src', 'dest/img/search-icon-in.png');
        } else {
            allProp.classList.add('active');
            allProp.firstElementChild.setAttribute('src', 'dest/img/search-icon-in.png');
        }
    };
    button.appendChild(img);
    const element = document.createElement('div');
    element.className = 'prop-all ol-unselectable ol-control';
    element.appendChild(button);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(PropViewAllControl, ol.control.Control);

const RefreshControl = function(opt_options) {
    const options = opt_options || {};
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.setAttribute('src', 'dest/img/refresh-icon.png');
    img.setAttribute('width', '11.0px');
    img.setAttribute('height', '11.0px');
    button.addEventListener('click', handleRefresh, false);
    const self = this;
    function handleRefresh(ev) {
        self.getMap().getLayers().getArray()[0].getSource().refresh();
    };
    button.appendChild(img);
    const element = document.createElement('div');
    element.className = 'refresh ol-unselectable ol-control';
    element.appendChild(button);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(RefreshControl, ol.control.Control);

export { PropViewControl, PropViewAllControl, RefreshControl }
