var Map = require('./map');
var Picker = require('./picker');
var Manager = require('./manager');

var App = { color: 'rgb(0, 0, 255)', alpha: '0.6', target: 'none', view: '' };

var target = null;
var map = new Map('map', App);
var picker = new Picker(document.body, App);
var manager = new Manager(document.body, App);

var observer = new MutationObserver(mutationFunction);
function mutationFunction(mutations) {
    for (var key in mutations) {
        App.color = document.getElementsByClassName('picker-toggle')[0].style.backgroundColor;
        App.alpha = document.getElementsByClassName('alpha-slider')[0].getAttribute('value');
        App.target = document.getElementsByClassName('target-property')[0].innerHTML;
        App.view = document.getElementsByClassName('all-property')[0].getAttribute('value');
        map.changeStyle(App.color, App.alpha, App.target, App.view);
    }
}

window.onload = function() {
    map.cache();

    observer.observe(document.getElementsByClassName('alpha-slider')[0], { attributes: true, attributeFilter: ['value'] });
    observer.observe(document.getElementsByClassName('target-property')[0], { attributes: true, attributeFilter: ['value'] });
    observer.observe(document.getElementsByClassName('all-property')[0], { attributes: true, attributeFilter: ['value'] });
}
