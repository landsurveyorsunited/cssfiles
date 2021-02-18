// script courtesy of Matt Stow (@stowball)
var supportsOrientationChange = 'onorientationchange' in window, orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize';

var $container = document.getElementsByClassName('container')[0];

$container.style.width = document.body.clientHeight + 'px';
$container.style.height = document.body.clientWidth + 'px';

window.addEventListener(orientationEvent, function() {
    $container.style.width = document.body.clientHeight + 'px';
    $container.style.height = document.body.clientWidth + 'px';
}, false);