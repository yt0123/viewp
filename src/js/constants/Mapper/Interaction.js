import ol from 'openlayers';
import ActionTypes from '../Actiontypes';
import Properties from './Properties';

const PropInteraction = function(opt_options) {
    const activate = { layer: null, feature: null, counter: 0 };
    ol.interaction.Pointer.call(this, {
        handleMoveEvent: handlePointerMove
    });
    function handlePointerMove(ev) {
        activate.flag = true;
        const target = document.getElementsByClassName('target-property')[0].innerHTML;
        if (!document.getElementsByClassName('all-property')[0].classList.contains('active')) {
            const feature = ev.map.forEachFeatureAtPixel(ev.pixel, propView);
            function propView(feature) {
                const accessLayers = ev.map.getLayers().getArray();
                for (let i = 1; i < accessLayers.length; i++) {
                    const targetFunction = accessLayers[i].getStyle();
                    const targetStyle =  targetFunction(feature);
                    const targetText = targetStyle.getText();
                    if (activate.feature && activate.layer) {
                        if (activate.feature.getId() !== feature.getId()) {
                            activate.feature.setStyle(null);
                            activate.feature = null;
                            activate.layer = null;
                        }
                    }
                    if (target !== 'none') {
                        const accessor = Properties.deploy(i - 1, target);
                        let label = feature.getProperties();
                        accessor.forEach(function (elm, index) { label = label[elm]; });
                        targetText.setText(String(label));
                        targetStyle.setText(targetText);
                        feature.setStyle(targetStyle);
                        activate.feature = feature;
                        activate.layer = i;
                    }
                }
                activate.flag = false;
            }
        }
        if (activate.flag && activate.feature) {
            activate.feature.setStyle(null);
            activate.feature = null;
        }
    }
};
ol.inherits(PropInteraction, ol.interaction.Pointer);

export { PropInteraction }
