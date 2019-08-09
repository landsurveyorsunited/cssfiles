(function(window) {
'use strict';

var calcSS3 = document.querySelector('.calc-main'),
// display things
display = calcSS3.querySelector('.calc-display span'),
radDeg = calcSS3.querySelector('.calc-rad'),
smallerButton = calcSS3.querySelector('.calc-smaller'),
hold = calcSS3.querySelector('.calc-hold'),
lnButton = calcSS3.querySelector('.calc-ln'),
helpButton = calcSS3.querySelector('.calc-info'),
secondKeySet = [].slice.call(calcSS3.querySelector('.calc-left').children, 12, 20),
hiddenCopy = calcSS3.querySelector('textarea'),

pressedKey,
frozenKey, // active calculation keys
secondActive = false, // 2nd key active?
bracketKey,
brackets = 0, // count of current open brackets
calculator = [], // instances of Calculator
deg = false, // Deg mode or Rad
memory = 0,
resBuffer = '0',
bigger = false, // app size
ln = 0,
buffStr = [],
sav = ['secondActive', 'deg', 'memory', 'buffStr', 'resBuffer'],
keyBoard = {},
secondLayer = [
['sin', 'cos', 'tan', 'ln', 'sinh', 'cosh', 'tanh', 'e<sup>x</sup>'],
[
'sin<sup>-1</sup>',  'cos<sup>-1</sup>',  'tan<sup>-1</sup>',  'log<sub>2</sub>',
'sinh<sup>-1</sup>', 'cosh<sup>-1</sup>', 'tanh<sup>-1</sup>', '2<sup>x</sup>'
]
],
Calculator = function() { // for every '(' a new instance
this.stack = [],
this.num = 0,
this.res = 0,
this.buff = [false, false];

this.curr = true;

this.rank = {
'=': 0,
'+': 1, '-': 1,
'/': 2, '*': 2,
'yx': 3, 'sqrx,y': 3, 'EE': 3
};
};

Calculator.prototype.calc = function(key, val) {
var rank = this.rank;

if (key === '%') {
this.curr = 'funk';
return (this.stack[0] ? this.stack[this.num - 1][0] / 100 * val : val / 100) + '';
}
key = key.replace('*', '*').replace('/', '/').replace('_', '-');
if (key !== '=') {
this.buff[1] = key;
} else if (this.buff[0] === false) {
this.buff[0] = val; // feed buffer for repeating '='
}
if (key === '=' && !this.stack[0] && this.curr && this.buff[1]) { // repeating '='
return (this.buff[1] === 'yx' ? Math.pow(val, this.buff[0]) : this.buff[1] === 'sqrx,y' ?
Math.pow(val, 1 / this.buff[0]) : [1] === 'EE' ? val * Math.pow(10, this.buff[0]) :
eval('(' + val + ')' + this.buff[1] + '(' + this.buff[0] + ')')) + '';
}
if (!this.stack[0] && key !== '=') { // first filling
this.buff[0] = false;
this.stack[this.num++] = [val, key];
this.curr = true;
return val + '';
}
if (this.stack[0] && this.curr && this.curr !== 'funk' && key !== '=') { // retyping / correcting operant
this.stack[this.num - 1] = [val, key];
return val + ''
}
if (!this.stack[0]) {
return val + '';
}
if (rank[key] <= rank[this.stack[this.num - 1][1]]) {
this.stack[this.num - 1] = [
this.stack[this.num - 1][1] === 'yx' ? Math.pow(this.stack[this.num - 1][0], val) :
this.stack[this.num - 1][1] === 'sqrx,y' ? Math.pow(this.stack[this.num - 1][0], 1 / val) :
this.stack[this.num - 1][1] === 'EE' ? this.stack[this.num - 1][0] * Math.pow(10, val) :
eval('(' + this.stack[this.num - 1][0] + ')' + this.stack[this.num - 1][1] + '(' + val + ')'),
key
];
}
if (rank[key] > rank[this.stack[this.num - 1][1]]) {
this.stack[this.num++] = [val, key];
} else if (this.stack[this.num - 2] && rank[key] <= rank[this.stack[this.num - 2][1]]) {
this.calc(key, this.stack[--this.num][0]);
}
this.res = (this.stack[this.num - 1] ? this.stack[this.num - 1][0] : this.res) + '';
if (key === '=') {
this.init('AX');
}
this.curr = true;
return this.res;
};

Calculator.prototype.init = function(key) {
if (key.match(/A/)) {
this.stack = [];
this.num = 0;
};
if (key === 'AC') {
this.buff = [false, false];
}
return '0';
};


// ---------- INIT... ---------- //

// hiddenCopy.focus(); // for Chrome extention only

// colloect all keys...
for (var k = 2; k--; ) {
for (var l = calcSS3.children[k + 1], m = l.children, n = m.length; n--; ) {
keyBoard[l.children[n].textContent.replace(/\s*/g, '')] = l.children[n];
}
}
keyBoard['C'] = keyBoard['AC'];
keyBoard['Rad'] = keyBoard['Deg'];
for (var m = secondLayer[0], n = m.length; n--; ) {
keyBoard[secondLayer[1][n].replace(/<\/*\w+>/g, '')] = keyBoard[m[n]];
}
keyBoard['2x'] = keyBoard['ex'];


calculator[0] = new Calculator();

// recover after reload or crash...
(function(localStorage) {
if (!localStorage || !localStorage['resBuffer']) {
return; // for the very first run or after fatal crash
}
bigger = localStorage['bigger'] ? eval(localStorage['bigger']) : true;
toggleCalc();
if (+localStorage['ln']) {
ln = localStorage['ln'];
switchGrouping();
}
try {
if (localStorage['secondActive'].match(/false|null/) ? false : true) {
keyDown(false, keyBoard['2nd']);
doKey('2nd', true);
}
if (eval(localStorage['deg'])) doKey('Deg', true);
if (localStorage['memory']) {
render(localStorage['memory']);
doKey('m+', true);
}
render(localStorage['resBuffer']);
var buffStrX = localStorage['buffStr'].split(',');
for (var n = 0, m = buffStrX.length; n < m; n++) {
if (buffStrX[n]) doKey(buffStrX[n], true);
}
render(localStorage['resBuffer']);
resBuffer = localStorage['resBuffer'];
} catch (e) {
for (var n = sav.length; n--;) {
localStorage.removeItem(sav[n]);
}
}
})(window.localStorage);

// ---------------- event listeners mouse --------------- //

calcSS3.onmousedown = function(e) {
keyDown(e);
if (!pressedKey) return false;
document.addEventListener('mouseout', keyUp, false);
document.addEventListener('mouseover', keyDown, false);
return false;
}

document.addEventListener('mouseup', function(e) {
var event = e || window.event,
target = getTargetKey(event.target),
keyText = target.textContent.replace(/\s*/g, ''),
key = keyBoard[keyText];

if (event.target === helpButton) {
alert('Geody Home\n\nCalcSS3 v0.9.95 (2010-2015) by Peter Dematte\'');
}
if (event.target === smallerButton) {
toggleCalc(true);
}
if (event.target === lnButton) {
switchGrouping(true);
}
if (event.target !== lnButton) {
toggleOptions();
}
document.removeEventListener('mouseout', keyUp, false);
document.removeEventListener('mouseover', keyDown, false);
if (!pressedKey) {
return false;
}
if (key) {
doKey(keyText);
saveState();
}
}, false);

display.parentElement.addEventListener('dblclick', function() {
if (!helpButton.active) {
toggleCalc(true);
}
}, false);

helpButton.addEventListener('mouseover', function() {
toggleOptions(true);
}, false);

// ------------------- event related functions ------------------ //

function keyDown (e, obj) { // works for mouse and key
var event = e || window.event,
target = obj || getTargetKey(event.target),
keyText = target.textContent.replace(/\s*/g, ''),
key = keyBoard[keyText];

if (key) {
keyUp(); // recover key in case of a javaScript Error
pressedKey = key;
key.className = key.className + ' calc-press';
}
return false;
}

function getTargetKey(elm) {
while (elm !== calcSS3 && elm.parentNode && elm.parentNode.style &&
!/calc-(?:left|right)/.test(elm.parentNode.className)) {
elm = elm.parentNode;
}
return elm;
}

function keyUp() {
if (pressedKey && pressedKey !== secondActive) {
pressedKey.className = pressedKey.className.replace(' calc-press', '');
pressedKey = null;
}
}

function freezeKey(key, del) {
var obj = (!del || del !== 2) ? frozenKey : key;
if (obj) obj.className = obj.className.replace(' calc-active', '');
if (!del) {
key.className = key.className + ' calc-active';
frozenKey = key;
}
return obj;
}

function saveState() {
for (var n = sav.length; n--;) {
localStorage[sav[n]] = eval(sav[n]); // oooohhhh, outch...
}
}

function toggleOptions(doIt) {
helpButton.active = !!doIt;
}

function toggleCalc(doIt) {
var cName = calcSS3.className;

if (doIt) {
bigger = !bigger;
}
localStorage['bigger'] = bigger;
calcSS3.className = bigger ?
cName.replace(' calc-small', '') :
cName + ' calc-small';
smallerButton.firstChild.data = bigger ? '>' : '<';
render(resBuffer);
}

function switchGrouping(doIt) {
if (doIt) {
ln = ++ln > 3 ? 0 : ln;
}
lnButton.firstChild.data = !ln ? '.' : ln === 1 ? ',' : ln === 2 ? ',.' : '.,';
render(resBuffer);
localStorage['ln'] = ln;
}

function render(val, inp) {
var regx = /(\d+)(\d{3})/,
hasComma = val.match(/\./),
tmp,
valAbs = Math.abs(+val),
fontSize = 45,
displayStyle = display.style,
displayParentStyle = display.parentNode.style;

if (val.match(/NaN|Inf|Error/)) {
tmp = 'Error';
} else {
resBuffer = val;
if (valAbs >= 1e+16) {
val = (+val).toExponential(13) + '';
}
if (!bigger && ((!inp || inp === '+/_') && valAbs !== 0)) {
val = (+val).toPrecision(9);
}
tmp = (val + '').split('.');
if (tmp[1]) {
tmp[2] = tmp[1].split('e');
if (tmp[2][1]) {
tmp[1] = tmp[2][0];
}
if (!inp || inp === '+/_') {
tmp[1] = (((+('1.' + tmp[1])).toPrecision(bigger ? 16 : tmp[2][1] ? 7 : 9)) + '');
if (tmp[1] >= 2) {
tmp[0] = (+tmp[0] + 1) + '';
}
tmp[1] = tmp[1].substr(2).replace(/0+$/, '');
}
}
while (regx.test(tmp[0])) {
tmp[0] = tmp[0].replace(regx, '$1' + ' ' + '$2');
}
tmp = tmp[0] + ((tmp[1] || hasComma) ? '.' + tmp[1] : '').
replace('.undefined', '').
replace(inp ? '' : /\.$/, '') + (tmp[2] && tmp[2][1] ? 'e' + tmp[2][1] : '');
}
if (ln) {
tmp = tmp.replace(/\./g, '#').
replace(/\s/g, ln === 1 ? ' ' : ln === 2 ? ',' : '.').
replace(/#/g, ln === 2 ? '.' : ',');
}
display.firstChild.data = tmp;
// for common use: get values of pixels dynamically to stay free from design (...but outside this function)
displayStyle.fontSize = '45px';
displayParentStyle.lineHeight = '61px';
while (display.offsetWidth > display.parentNode.offsetWidth - (bigger ? 40 : 30)) {
displayStyle.fontSize = (fontSize--) + 'px';
displayParentStyle.lineHeight = (fontSize + 18) + 'px'
}
}

function doKey(text, alt) {
var key = keyBoard[text]; // text = key.textContent.replace(/\s*/g, '');

if (text === '2nd') {
secondActive = secondActive ? null : true;
key.className = secondActive ? 'calc-press calc-second' : ''; // !!!
for (var n = secondKeySet.length; n--; ) {
secondKeySet[n].children[0].innerHTML = secondLayer[secondActive ? 1 : 0][n];
}
} else if (text.match(/^[+|_|/|*|yx|sqrx,y|E]+$/) && text !== 'sqr') {
freezeKey(key);
} else if (text.match(/^[\d|\.|Pi]$/)) {
freezeKey(key, true);
keyBoard['AC'].children[0].firstChild.data = 'C';
} else if (text === 'C') {
key.children[0].firstChild.data = 'AC';
if (frozenKey) freezeKey(frozenKey);
} else if (text.match(/AC|=/)) {
if (bracketKey) freezeKey(bracketKey, 2);
freezeKey(key, true);
frozenKey = null
} else if (text.match(/Deg|Rad/)) {
radDeg.firstChild.data = deg ? 'Rad' : 'Deg';
key.children[0].firstChild.data = deg ? 'Deg' : 'Rad';
deg = !deg
} else if (text === '(') {
bracketKey = key;
freezeKey(bracketKey, 2).className += ' calc-active';
} else if (text === ')' && brackets === 1 && bracketKey) {
freezeKey(bracketKey, 2);
} else if (text.match(/^mr$/) && memory) {
keyBoard['AC'].children[0].firstChild.data = 'C';
}

evalKey(text);

if (!alt) {
keyUp();
}
if (text.match(/^m[c|+|-]/)) {
freezeKey(keyBoard['mr'], 2).className += (memory ? ' calc-active' : '');
}
}

function evalKey(key) {
var dispVal = resBuffer.replace(/\s/g, '').replace(/Error|∞|-∞/, '0') + '',
_PI = Math.PI,
lastKey;

if (!key.match(/2nd|Deg|Rad|m/)) { // +/- issue
buffStr.push(key);
if ((buffStr[buffStr.length - 2] === '=' && key !== '=' &&
calculator[brackets].curr) || key === 'AC') {
buffStr = [key];
}
}
lastKey = buffStr[buffStr.length - 2];
if (key.match(/^[\d|\.]$/) || key === '+/_') {
if (calculator[brackets].curr && key !== '+/_' || (key === '+/_' &&
lastKey && lastKey.match(/^[+|_|/|*|yx|sqrx,y|E|^C]+$/))) {
dispVal = '0';
calculator[brackets].curr = false;
}
if ((Math.abs(+(dispVal + key)) > (bigger ? 1e15 : 1e9) ||
dispVal.replace(/^-/, '').length > 15 ||
(dispVal.replace('-', '').replace(/\./g, '').length > (bigger ? 14 : 8)) ||
(dispVal.match(/\.|\e\+/) && key === '.')) && key !== '+/_') {
buffStr.pop();
return;
} else if (key === '+/_') {
render(!(dispVal.replace(/e[\+|\-]/, '')).match('-') ?
'-' + dispVal : dispVal.replace(/^-/, ''), '+/_');
} else {
render((dispVal + key).replace(/^(-)*?0(\d)$/, '$1' + '$2'), true);
}
} else if (key.match(/^C|AC/)) {
render(calculator[brackets].init(key));
hold.textContent = '';
} else if (key.match(/^[+|_|/|*|-|\/|*|yx|sqrx,y|%|E]+$/) && key !== 'sqr') {
render(calculator[brackets].calc(key, dispVal));
} else {
if (brackets > -1) {
calculator[brackets].curr = 'funk';
}
switch (key) {
case '=':
while (brackets > -1) {
render(dispVal = calculator[brackets--].calc('=', dispVal));
}
brackets = 0;
calculator[brackets].curr = true;
break;
case '(':
calculator[++brackets] = new Calculator();
calculator[brackets].curr = true;
break;
case ')':
if (brackets) {
render(calculator[brackets--].calc('=', dispVal));
}
if (brackets > -1) {
calculator[brackets].curr = false;
}
break;
case 'mc':
memory = 0;
break;
case 'm+':
memory += +dispVal;
break;
case 'm-':
memory -= +dispVal;
break;
case 'mr':
render(memory + '');
break;
case '1/x':
render((1 / dispVal) + '');
break;
case 'x2':
render(Math.pow(dispVal, 2) + '');
break;
case 'x3':
render(Math.pow(dispVal, 3) + '');
break;
case 'x!':
render((function fak(n) {
return n < 0 || n > 170 ? NaN : n <= 1 ? 1 : n * fak(n - 1)
})(Math.round(+dispVal)) + '');
break;
case 'sqr':
render(Math.sqrt(dispVal) + '');
break;
case 'log':
render(Math.log(dispVal) / Math.log(10) + '');
break;
case 'sin':
render(!deg && Math.abs(dispVal) === _PI ? '0' :
Math.sin(dispVal * (deg ? _PI / 180 : 1)) + '');
break;
case 'sin-1':
render(Math.asin(dispVal) * (deg ? 180 / _PI : 1) + '');
break;
case 'cos':
render(Math.cos(dispVal * (deg ? _PI / 180 : 1)) + '');
break;
case 'cos-1':
render(Math.acos(dispVal) * (deg ? 180 / _PI : 1) + '');
break;
case 'tan':
render(!deg && Math.abs(dispVal) === _PI ? '0' :
Math.tan(dispVal * (deg ? _PI / 180 : 1)) + '');
break;
case 'tan-1':
render(Math.atan(dispVal) * (deg ? 180 / _PI : 1) + '');
break;
case 'ln':
render(Math.log(dispVal) + '');
break;
case 'log2':
render(Math.log(dispVal) / Math.log(2) + '');
break;
case 'sinh':
render(((Math.pow(Math.E, dispVal) - Math.pow(Math.E, -dispVal)) / 2) + '');
break;
case 'sinh-1':
render(Math.log(+dispVal + Math.sqrt(1 + Math.pow(dispVal, 2))) + '');
break;
case 'cosh':
render(((Math.pow(Math.E, dispVal) + Math.pow(Math.E, -dispVal)) / 2) + '');
break;
case 'cosh-1':
render(2 * Math.log(Math.sqrt((+dispVal + 1) / 2) + Math.sqrt((+dispVal - 1) / 2)) + '');
break;
case 'tanh':
(function(e1, e2) {
render((e1 - e2) / (e1 + e2) + '');
})(Math.pow(Math.E, dispVal), Math.pow(Math.E, -dispVal));
break;
case 'tanh-1':
render((Math.log(+dispVal + 1) - Math.log(1 - dispVal)) / 2 + '');
break;
case 'ex':
render(Math.exp(dispVal) + '');
break;
case '2x':
render(Math.pow(2, (dispVal)) + '');
break;
case 'Pi':
render(_PI + '');
break;
case 'Rand':
render(Math.random() + '');
break;
default:
// buffStr.pop();
break;
}
}
}
localStorage.clear();
bigger=startCalcSci;
if (window.innerWidth<=smlwinw) {bigger = false;}
toggleCalc(false);
})(window);