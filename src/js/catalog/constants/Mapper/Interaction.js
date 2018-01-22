import ol from 'openlayers';
import Properties from './Properties';

const PropInteraction = function(opt_options) {
    ol.interaction.Pointer.call(this, {
        handleDownEvent: handleClick
    });
    function handleClick(ev) {
        const map = ev.map;
        const overlay = map.getOverlayById('popup');
        overlay.setPosition();

        map.forEachFeatureAtPixel(ev.pixel, function(feature, layer) {
            const properties = feature.getProperties();
            overlay.getElement().innerHTML = Properties.deploy(layer.get('id_'), properties);
            overlay.setPosition(ev.coordinate);
        });
    }
};
ol.inherits(PropInteraction, ol.interaction.Pointer);
const FeatureInteraction = function(opt_options) {
    ol.interaction.Pointer.call(this, {
        handleMoveEvent: handlePointerMove
    });
    function handlePointerMove(ev) {
        const map = ev.map;
        map.getTargetElement().style.cursor = map.hasFeatureAtPixel(ev.pixel) ? 'pointer' : '';
    }
};
ol.inherits(FeatureInteraction, ol.interaction.Pointer);

export { FeatureInteraction, PropInteraction }
