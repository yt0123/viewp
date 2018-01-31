import ol from 'openlayers';
import Config from './Config';
import Properties from './Properties';
import Utils from '../Utils';

const Factory = {
    pointStyleFunction: function() {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: Config.fill()
                })
            })
        });
    },
    lineStringStyleFunction: function() {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: Config.fill(),
                width: 3
            })
        });
    },
    polygonStyleFunction: function(alpha) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: Config.stroke(),
                width: 1
            }),
            fill: new ol.style.Fill({
                color: Config.fill(alpha)
            })
        });
    },
    textStyleFunction: function(text) {
        return new ol.style.Text({
            text: text,
            textAlign: 'center',
            scale: Config.scale(),
            overflow: true,
            fill: new ol.style.Fill({color: Config.text()}),
            stroke: new ol.style.Stroke({color: Config.outline(), width: 2})
        })
    },
    segmentStyleFunction: function(geometry) {
        let styles = [];
        let term = null;
        geometry.forEachSegment((start, end) => {
            term = end;
            const pointStyle = new ol.style.Style({
                geometry: new ol.geom.Point(start),
                image: new ol.style.Circle({
                    radius: 3,
                    fill: new ol.style.Fill({
                        color: Config.fill(0.8)
                    })
                })
            });
            styles.push(pointStyle)
        });
        if (term) {
            styles.push(new ol.style.Style({
                geometry: new ol.geom.Point(term),
                image: new ol.style.Circle({
                    radius: 3,
                    fill: new ol.style.Fill({
                        color: Config.fill(0.8)
                    })
                })
            }));
        }
        return styles;
    },
    trackStyleFunction: function(coordinates) {
        let styles = [];
        const geometry = new ol.geom.LineString(coordinates);
        const comColor = Utils.complementaryRgba(Config.fill(0.8));
        const pointStyle = new ol.style.Style({
            geometry: new ol.geom.Point(geometry.getFirstCoordinate()),
            image: new ol.style.Circle({
                radius: 4,
                fill: new ol.style.Fill({
                    color: comColor
                })
            })
        });
        styles.push(pointStyle);
        geometry.forEachSegment((start, end) => {
            const dx = end[0] - start[0];
            const dy = end[1] - start[1];
            if (dx !== 0 && dy !== 0) {
                const rotation = Math.atan2(dy, dx);
                const size = 40;
                const arrow = new ol.geom.LineString([[end[0] - size, end[1] + size], end, [end[0] - size, end[1] - size]]);
                arrow.rotate(rotation, end);
                const arrowStyle = new ol.style.Style({
                    geometry: arrow,
                    stroke: new ol.style.Stroke({
                        color: comColor,
                        width: 3,
                        lineCap: 'square'
                    }),
                    zIndex: 1
                });
                styles.push(arrowStyle);
            }
        });
        return styles;
    },
    linkStyleFunction: function(coordinates) {
        return new ol.style.Style({
            geometry: new ol.geom.LineString(coordinates).transform('EPSG:4326', 'EPSG:3857'),
            stroke: new ol.style.Stroke({
                color: Config.stroke(),
                width: 2,
                lineCap: 'square',
                lineDash: [0.8, 4],
                lineDashOffset: 2.5
            })
        });
    },
    arrowStyleFunction: function(coordinates) {
        let styles = [];
        const geometry = new ol.geom.LineString(coordinates).transform('EPSG:4326', 'EPSG:3857');
        const lineStyle = new ol.style.Style({
            geometry: geometry,
            stroke: new ol.style.Stroke({
                color: Config.stroke(),
                width: 2,
                lineCap: 'square',
                lineDash: [0.8, 4],
                lineDashOffset: 2.5
            })
        });
        styles.push(lineStyle);
        geometry.forEachSegment((start, end) => {
            const dx = end[0] - start[0];
            const dy = end[1] - start[1];
            const rotation = Math.atan2(dy, dx);
            const size = 20;
            const arrow = new ol.geom.LineString([[end[0] - size, end[1] + size], end, [end[0] - size, end[1] - size]]);
            arrow.rotate(rotation, end);
            const arrowStyle = new ol.style.Style({
                geometry: arrow,
                stroke: new ol.style.Stroke({
                    color: Config.stroke(),
                    width: 3,
                    lineCap: 'square'
                }),
                zIndex: 1
            });
            styles.push(arrowStyle);
        });
        return styles;
    },
    styleFactory: function(staple) {
        return (feature) => {
            const geometry = feature.getGeometry();
            const properties = feature.getProperties();
            const type = geometry.getType();

            let style = null;
            let styles = [];

            switch (type) {
                case 'Point':
                    style = Factory.pointStyleFunction();
                    break;
                case 'LineString':
                    style = Factory.lineStringStyleFunction();
                    styles = styles.concat(Factory.segmentStyleFunction(geometry));
                    break;
                case 'Polygon':
                    style = Factory.polygonStyleFunction(properties.tmp_.score);
                    break;
            }

            if (staple !== 'none') {
                const text = Properties.fetch(staple, properties);
                style.setText(
                    Factory.textStyleFunction(text)
                );
            }

            styles.push(style);

            if (properties.tmp_.link) {
                const coordinates = properties.tmp_.link;
                if (coordinates.length > 1) { styles.push(Factory.linkStyleFunction(coordinates)); }
            }

            if (properties.tmp_.track) {
                const coordinates = properties.tmp_.track;
                if (coordinates.length > 1) {
                    styles = styles.concat(Factory.arrowStyleFunction(coordinates));
                }
            }

            if (properties.tmp_.orient) {
                let coordinates = geometry.getCoordinates();
                if (coordinates.length > 1) {
                    if (properties.tmp_.orient === -1) { coordinates = coordinates.reverse(); }
                    styles = styles.concat(Factory.trackStyleFunction(coordinates));
                }
            }

            return styles;
        };
    }
};

export default Factory;
