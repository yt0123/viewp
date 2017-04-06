var ol = require('openlayers');
var ActionTypes = require('./Actiontypes');

var property = {
    none: [-1]
};
var colors = {
    fill: 'rgba(%rgb, %alpha)',
    stroke: 'rgba(170, 170, 170, %alpha)',
    outline: 'rgba(255, 255, 255, %alpha)'
};
function createStyleFunction(rgb, alpha, properties) {
    var fillColor = colors['fill'].replace('%rgb', rgb).replace('%alpha', alpha);
    var strokeColor = colors['stroke'].replace('%alpha', alpha);
    var outlineColor = colors['outline'].replace('%alpha', alpha);

    return function(feature) {
        var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: strokeColor,
                width: 1
            }),
            fill: new ol.style.Fill({
                color: fillColor
            }),
            text: new ol.style.Text({
                textAlign: 'center',
                fill: new ol.style.Fill({color: fillColor}),
                stroke: new ol.style.Stroke({color: outlineColor, width: 2})
            })
        });
        return style;
    };
}
function createPropFunction(id, properties) {
    console.log(id);
    for (var i = 0; i < properties[0].length; i++) {
        if (properties[0][i] in property) {
            property[properties[0][i]].push(id);
        } else {
            var list = document.createElement('li');
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
}
function deletePropFunction(id) {
    console.log(id);
    var elm = document.getElementsByClassName('properties')[0];
    for (var key in property) {
        var index = property[key].indexOf(id);
        if (index >= 0) {
            property[key].pop(index);
            if (property[key].length == 0) {
                elm.removeChild(document.getElementById(key));
                delete property[key];
            }
        }
    }
}
function alphaFunction(feature) {
}

var PropViewControl = function(opt_options) {
    var options = opt_options || {};
    var lists = document.createElement('ul');
    lists.classList.add('properties');
    lists.innerHTML = '<li id=\'none\' value>none</li>';
    lists.firstElementChild.addEventListener('click', function(ev) {
        document.getElementsByClassName('target-property')[0].innerHTML = this.innerHTML;
        document.getElementsByClassName('properties')[0].classList.remove('active');
    });
    var button = document.createElement('button');
    button.classList.add('target-property');
    button.innerHTML = 'none';
    button.addEventListener('click', handlePropView, false);
    function handlePropView(ev) {
        var props = document.getElementsByClassName('properties')[0];
        if (props.classList.contains('active')) {
            props.classList.remove('active');
        } else {
            props.classList.add('active');
        }
    };
    var element = document.createElement('div');
    element.className = 'prop-view ol-unselectable ol-control';
    element.appendChild(lists);
    element.appendChild(button);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(PropViewControl, ol.control.Control);
var PropViewAllControl = function(opt_options) {
    var activeLayers = [];
    var options = opt_options || {};
    var button = document.createElement('button');
    button.classList.add('all-property');
    var img = document.createElement('img');
    img.setAttribute('src', 'dest/img/search-icon-out.png');
    img.setAttribute('width', '10.5px');
    img.setAttribute('height', '10.5px');
    button.addEventListener('click', handlePropViewAll, false);
    var self = this;
    function handlePropViewAll(ev) {
        var target = document.getElementsByClassName('target-property')[0].innerHTML;
        var accessLayers = self.getMap().getLayers().getArray();
        var allProp = document.getElementsByClassName('all-property')[0];
        if (allProp.classList.contains('active')) {
            allProp.classList.remove('active');
            if (activeLayers.length > 0) {
                for (var i = accessLayers.length-1; i > 0; i--) { accessLayers[i].setStyle(activeLayers.pop()); }
            }
            allProp.firstElementChild.setAttribute('src', 'dest/img/search-icon-out.png');
        } else {
            allProp.classList.add('active');
            for (var i = 1; i < accessLayers.length; i++) {
                var styleFunction = accessLayers[i].getStyle();
                var targetFunction = function(feature) {
                    var style = styleFunction(feature);
                    style.getText().setText(feature.getProperties()[target]);
                    return style;
                };
                activeLayers.push(styleFunction);
                accessLayers[i].setStyle(targetFunction);
            }
            allProp.firstElementChild.setAttribute('src', 'dest/img/search-icon-in.png');
        }
    };
    button.appendChild(img);
    var element = document.createElement('div');
    element.className = 'prop-all ol-unselectable ol-control';
    element.appendChild(button);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(PropViewAllControl, ol.control.Control);
var RefreshControl = function(opt_options) {
    var options = opt_options || {};
    var button = document.createElement('button');
    var img = document.createElement('img');
    img.setAttribute('src', 'dest/img/refresh-icon.png');
    img.setAttribute('width', '11.0px');
    img.setAttribute('height', '11.0px');
    button.addEventListener('click', handleRefresh, false);
    var self = this;
    function handleRefresh(ev) {
        self.getMap().getLayers().getArray()[0].getSource().refresh();
    };
    button.appendChild(img);
    var element = document.createElement('div');
    element.className = 'refresh ol-unselectable ol-control';
    element.appendChild(button);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(RefreshControl, ol.control.Control);

var PropInteraction = function(opt_options) {
    var activeLayer, activeFeature;
    ol.interaction.Pointer.call(this, {
        handleMoveEvent: handlePointerMove
    });
    function handlePointerMove(ev) {
        var map = ev.map;
        var counter = 0;
        var target = document.getElementsByClassName('target-property')[0].innerHTML;
        var targetDepth = document.getElementById(target).getAttribute('value').split('-');
        if (!document.getElementsByClassName('all-property')[0].classList.contains('active')) {
            var feature = map.forEachFeatureAtPixel(ev.pixel, propView);
            function propView(feature) {
                var accessLayers = map.getLayers().getArray();
                for (var i = 1; i < accessLayers.length; i++) {
                    var targetFunction = accessLayers[i].getStyle();
                    var targetStyle =  targetFunction(feature);
                    var targetText = targetStyle.getText();
                    if (activeFeature && activeLayer) {
                        if (activeFeature.getId() != feature.getId()) {
                            activeFeature.setStyle(null);
                            activeFeature = null;
                            activeLayer = null;
                            if (target != 'none') {
                                targetText.setText(feature.getProperties()[target]);
                                targetStyle.setText(targetText);
                                feature.setStyle(targetStyle);
                                activeFeature = feature;
                                activeLayer = i;
                            }
                        }
                    } else {
                        if (target != 'none') {
                            targetText.setText(feature.getProperties()[target]);
                            targetStyle.setText(targetText);
                            feature.setStyle(targetStyle);
                            activeFeature = feature;
                            activeLayer = i;
                        }
                    }
                }
                counter++;
            }
        }
        if (counter == 0 && activeFeature) {
            activeFeature.setStyle(null);
            activeFeature = null;
        }
    }
};
ol.inherits(PropInteraction, ol.interaction.Pointer);

var Mapper = (function() {
    function Mapper(DOMtarget, config) {
        this.config = config;
        this.staples = [];
        this.layers = [];
        this.raster = new ol.source.XYZ({
            urls: [
                'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ]
        });
        this.map = new ol.Map({
            target: DOMtarget,
            layers: [
                new ol.layer.Tile({
                    source: this.raster
                })
            ],
            controls: [
                new ol.control.Zoom(),
                new PropViewControl(),
                new PropViewAllControl(),
                new RefreshControl()
            ],
            interactions: [
                new ol.interaction.DragRotate(),
                new ol.interaction.DoubleClickZoom(),
                new ol.interaction.DragPan(),
                new ol.interaction.PinchRotate(),
                new ol.interaction.KeyboardPan(),
                new ol.interaction.KeyboardZoom(),
                new ol.interaction.DragZoom(),
                new PropInteraction()
            ],
            view: new ol.View({
                center: ol.proj.transform([139.7800, 35.6800], 'EPSG:4326', 'EPSG:3857'),
                zoom: 11,
                maxzoom: 18,
                minzoom: 10
            })
        });
    }
    return Mapper;
})();
Mapper.prototype.change = function(action) {
    switch (action.type) {

    case ActionTypes.ADD_SOURCE:
        this.map.addLayer(new ol.layer.Vector());
        var newSource = action.source[action.index];
        var sourceFormat = new ol.format.GeoJSON({ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
        var newFeatures = sourceFormat.readFeatures(newSource.body);
        newFeatures.forEach(function(feature, index, array) { feature.setId(index); });
        var accessLayer = this.map.getLayers().getArray()[action.index+1];
        accessLayer.setSource(new ol.source.Vector({ features: newFeatures, format: sourceFormat }));
        accessLayer.setStyle(createStyleFunction(newSource.color, 0.5, newSource.extra));
        createPropFunction(action.index, newSource.extra);
        break;

    case ActionTypes.DELETE_SOURCE:
        var oldLayer = this.map.getLayers().getArray()[action.index+1];
        deletePropFunction(action.index);
        this.map.removeLayer(oldLayer);
        break;

    case ActionTypes.CHECK_SOURCE:
        var newInvalid = action.source[action.index].invalid;
        var accessLayer = this.map.getLayers().getArray()[action.inndex+1];
        accessLayer.setVisible(!newInvalid);
        break;

    case ActionTypes.STAPLE_SOURCE:
        var newStaple = action.source[action.index].staple;
        var accessLayer = this.map.getLayers().getArray()[action.index+1];
        accessLayer.getSource().getFeatures().forEach(function(feature, index, array) {
            var props = feature.getProperties();
            if (newStaple in props) {
                console.log(props[newStaple]);
            }
        });
        break;

    case ActionTypes.COLOR_SOURCE:
        var newColor = action.source[action.index].color;
        var accessLayer = this.map.getLayers().getArray()[action.index+1];
        accessLayer.setStyle(createStyleFunction(newColor, 0.5));
        break;

    case ActionTypes.CHANGE_ALPHA:
        var newAlpha = action.config.alpha;
        console.log(newAlpha);
        break;

    default:
        return;
    }
};

module.exports = Mapper;
