import ol from 'openlayers';
import ActionTypes from '../Actiontypes';
import * as Extensions from './Extensions';
import { PropViewControl, PropViewAllControl, RefreshControl } from './Control';
import { PropInteraction } from './Interaction';

export default class Map {
    constructor(DOMtarget, config) {
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

    change(action) {
        let accessLayer = this.map.getLayers().getArray()[action.index+1];
        switch (action.type) {
        case ActionTypes.ADD_SOURCE:
            this.map.addLayer(new ol.layer.Vector());
            const newSource = action.source[action.index];
            const sourceFormat = new ol.format.GeoJSON({ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
            const newFeatures = sourceFormat.readFeatures(newSource.body);
            newFeatures.forEach(function(feature, index, array) { feature.setId(index); });
            if (!accessLayer) { accessLayer = this.map.getLayers().getArray()[action.index+1]; }
            accessLayer.setSource(new ol.source.Vector({ features: newFeatures, format: sourceFormat }));
            accessLayer.setStyle(Extensions.createStyleFunction(newSource.color, 0.5, newSource.extra));
            Extensions.createPropFunction(action.index, newSource.extra);
            break;

        case ActionTypes.DELETE_SOURCE:
            Extensions.deletePropFunction(action.index);
            this.map.removeLayer(accessLayer);
            break;

        case ActionTypes.CHECK_SOURCE:
            const newInvalid = action.source[action.index].invalid;
            accessLayer.setVisible(!newInvalid);
            break;

        case ActionTypes.STAPLE_SOURCE:
            const newStaple = action.source[action.index].staple;
            accessLayer.getSource().getFeatures().forEach(function(feature, index, array) {
                var props = feature.getProperties();
                if (newStaple in props) {
                    console.log(props[newStaple]);
                }
            });
            break;

        case ActionTypes.COLOR_SOURCE:
            const newColor = action.source[action.index].color;
            accessLayer.setStyle(Extensions.createStyleFunction(newColor, 0.5));
            break;

        default:
            return;
        }
    }

    update(action) {
        switch (action.type) {
        case ActionTypes.CHANGE_ALPHA:
            const newAlpha = action.config.alpha;
            console.log(newAlpha);
            break;

        default:
            return;
        }
    }
};
