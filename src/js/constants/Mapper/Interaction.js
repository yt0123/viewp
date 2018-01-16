import ol from 'openlayers';

const PropInteraction = function(opt_options) {
    ol.interaction.Pointer.call(this, {
        handleDownEvent: handleClick
    });
    function handleClick(ev) {
        const overlay = ev.map.getOverlayById('popup');
        overlay.setPosition();

        const features = ev.map.getFeaturesAtPixel(ev.pixel);
        if (features) {
            const properties = features[0].getProperties();
            overlay.getElement().innerHTML = String(properties.color);
            overlay.setPosition(ev.coordinate);
        }
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
