import ol from 'openlayers';

const RefreshControl = function(opt_options) {
    const options = opt_options || {};
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.setAttribute('src', 'img/refresh-icon.png');
    img.setAttribute('width', '11.0px');
    img.setAttribute('height', '11.0px');
    button.addEventListener('click', handleRefresh, false);
    const self = this;
    function handleRefresh(ev) {
        self.getMap().getLayers().getArray()[0].getSource().refresh();
    }
    button.appendChild(img);
    const element = document.createElement('div');
    element.className = 'ol-refresh ol-unselectable ol-control';
    element.appendChild(button);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(RefreshControl, ol.control.Control);

export { RefreshControl }
