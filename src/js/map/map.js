var ol = require('openlayers');

function styleFunction(rgb, alpha, target, view) {
    var fillColor = rgb.replace('rgb', 'rgba').replace(')', ', ' + alpha + ')');
    var strokeColor = 'rgba(170, 170, 170, alpha)'.replace('alpha', alpha);
    var outlineColor = 'rgba(255, 255, 255, alpha)'.replace('alpha', alpha);

    return function(feature) {
        var props = feature.getProperties();
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
        if (view) { style.getText().setText(props[target]); }
        return style;
    };
}
function propFunction(features) {
    var props = document.getElementsByClassName('properties')[0];
    while (props.firstElementChild) props.removeChild(props.firstElementChild);
    var properties = ['none'];
    if (features.length > 0) {
        Array.prototype.push.apply(properties, Object.keys(features[0].properties));
        for (var i = 1; i < features.length; i++) {
            for (var key in features[i].properties) {
                if (properties.indexOf(key) != -1) {
                    continue;
                } else {
                    properties.push(key);
                }
            }
        }
    }
    for (var i = 0; i < properties.length; i++) {
        var list = document.createElement('li');
        list.innerHTML = properties[i];
        list.addEventListener('click', function(ev) {
            var target = document.getElementsByClassName('target-property')[0];
            target.innerHTML = this.innerHTML;
            target.setAttribute('value', this.innerHTML);
        })
        document.getElementsByClassName('properties')[0].appendChild(list);
    }
}
function alphaFunction(rgb) {
    var start = rgb.replace('rgb', 'rgba').replace(')', ', 0)'), end = rgb.replace('rgb', 'rgba').replace(')', ', 1)');
    var lg = 'linear-gradient(to right, start, end)'
    document.getElementsByClassName('alpha-slider')[0].style.background = lg.replace('start', start).replace('end', end);
}


var PropViewControl = function(opt_options) {
    var options = opt_options || {};
    var lists = document.createElement('ul');
    lists.classList.add('properties');
    lists.innerHTML = '<li>none</li>';
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
    var options = opt_options || {};
    var button = document.createElement('button');
    button.classList.add('all-property');
    button.setAttribute('value', '');
    var img = document.createElement('img');
    img.setAttribute('src', 'dest/img/search-icon-out.png');
    img.setAttribute('width', '10.5px');
    img.setAttribute('height', '10.5px');
    button.addEventListener('click', handlePropViewAll, false);
    function handlePropViewAll(ev) {
        var allProp = document.getElementsByClassName('all-property')[0];
        if (allProp.getAttribute('value')) {
            allProp.setAttribute('value', '');
            allProp.firstElementChild.setAttribute('src', 'dest/img/search-icon-out.png')
        } else {
            allProp.setAttribute('value', 'view');
            allProp.firstElementChild.setAttribute('src', 'dest/img/search-icon-in.png')
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
var AlphaControl = function(opt_options) {
    var options = opt_options || {};
    var alpha = opt_options.alpha;
    var slider = document.createElement('div');
    slider.classList.add('alpha-slider')
    slider.setAttribute('value', alpha);
    var widget = document.createElement('div');
    widget.classList.add('alpha-slider-widget');
    widget.style.left = '75px';
    var widget_x, current_x;
    widget.addEventListener('mousedown', drag, false);
    function drag(ev) {
        this.classList.add('drag');
        widget_x = ev.pageX - this.offsetLeft;
        document.body.addEventListener('mousemove', move, false);
    }
    function move(ev) {
        ev.preventDefault();
        var drag = document.getElementsByClassName('drag')[0];
        var next_x = ev.pageX - widget_x;
        if (next_x > current_x) {
            if (next_x > 150) { next_x = 150; }
            alpha = Math.round(next_x*10/150)/10;
        } else if (next_x < current_x) {
            if (next_x < 0) { next_x = 0; }
            alpha = Math.round(next_x*10/150)/10;
        }
        drag.style.left = next_x + 'px';
        slider.setAttribute('value', alpha);
        current_x = next_x;
        document.body.addEventListener('mouseup', drop, false);
        document.body.addEventListener('mouseleave', drop, false);
    }
    function drop(ev) {
        var drag = document.getElementsByClassName('drag')[0];
        document.body.removeEventListener('mousemove', move, false);
        document.body.removeEventListener('mouseup', drop, false);
        document.body.removeEventListener("mouseleave", drop, false);
        drag.classList.remove('drag');
    }
    slider.appendChild(widget)
    var element = document.createElement('div');
    element.className = 'alpha ol-unselectable ol-control';
    element.appendChild(slider);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(AlphaControl, ol.control.Control);
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
    var activeFeature;
    ol.interaction.Pointer.call(this, {
        handleMoveEvent: handlePointerMove
    });
    function handlePointerMove(ev) {
        var map = ev.map;
        var counter = 0;
        var target = document.getElementsByClassName('target-property')[0].innerHTML;
        if (!document.getElementsByClassName('all-property')[0].getAttribute('value')) {
            var feature = map.forEachFeatureAtPixel(ev.pixel, propView);
            function propView(feature) {
                var targetFunction =  map.getLayers().getArray()[1].getStyle();
                var targetStyle = targetFunction(feature);
                var targetText = targetStyle.getText();
                if (activeFeature) {
                    if (activeFeature.getId() != feature.getId()) {
                        activeFeature.setStyle(null);
                        activeFeature = null;
                        if (target != 'none') {
                            targetText.setText(feature.getProperties()[target]);
                            targetStyle.setText(targetText);
                            feature.setStyle(targetStyle);
                            activeFeature = feature;
                        }
                    }
                } else {
                    if (target != 'none') {
                        targetText.setText(feature.getProperties()[target]);
                        targetStyle.setText(targetText);
                        feature.setStyle(targetStyle);
                        activeFeature = feature;
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

var Map = (function() {
               function Map(DOMtarget, config) {
                   this.raster = new ol.source.XYZ({
                       urls: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png']
                   });
                   this.source = new ol.source.Vector({
                       features: [],
                       format: new ol.format.GeoJSON({
                           dataProjection: 'EPSG:4326',
                           featureProjection: 'EPSG:3857'
                       })
                   });
                   this.layer = new ol.layer.Vector({
                       source: this.source,
                       style: styleFunction(config.color, config.alpha)
                   });
                   this.map = new ol.Map({
                       target: DOMtarget,
                       layers: [
                           new ol.layer.Tile({
                               source: this.raster
                              }),
                           this.layer
                          ],
                       controls: [
                           new ol.control.Zoom(),
                           new PropViewControl(),
                           new PropViewAllControl(),
                           new RefreshControl(),
                           new AlphaControl(config)
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
               return Map;
           })();
Map.prototype.cache = function(geojson) {
    console.log(this.raster);
}
Map.prototype.changeSource = function(geojson) {
    this.source.clear()
    propFunction(geojson.features);
    var features = this.source.getFormat().readFeatures(geojson);
    features.forEach(function(feature, index, array) { feature.setId(index); });
    this.source.addFeatures(features);
}
Map.prototype.changeStyle = function(rgb, alpha, target, view) {
    alphaFunction(rgb);
    this.layer.setStyle(styleFunction(rgb, alpha, target, view));
}

module.exports = Map;
