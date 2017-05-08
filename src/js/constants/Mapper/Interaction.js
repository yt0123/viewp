import ol from 'openlayers';
import ActionTypes from '../Actiontypes';

var PropInteraction = function(opt_options) {
    let activeLayer, activeFeature;
    ol.interaction.Pointer.call(this, {
        handleMoveEvent: handlePointerMove
    });
    function handlePointerMove(ev) {
        let counter = 0;
        const map = ev.map;
        const target = document.getElementsByClassName('target-property')[0].innerHTML;
        const targetDepth = document.getElementById(target).getAttribute('value').split('-');
        if (!document.getElementsByClassName('all-property')[0].classList.contains('active')) {
            var feature = map.forEachFeatureAtPixel(ev.pixel, propView);
            function propView(feature) {
                const accessLayers = map.getLayers().getArray();
                for (var i = 1; i < accessLayers.length; i++) {
                    const targetFunction = accessLayers[i].getStyle();
                    const targetStyle =  targetFunction(feature);
                    const targetText = targetStyle.getText();
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

export { PropInteraction }
