/* 
  Simple slide-in panel, controlled by CSS variables.
	JavaScript is only used for toggling class names on panel.
  Supports all 4 directions left, right, top and bottom.
	JavaScript function returns handler for use on triggers.
	Panel closes on click outside panel (overlay) or on close button.
*/

(function() {
	var setPanelHandler = function(panel) {
		var panelClose = panel.querySelector(".panel-close-button"),
		panelContainer = panel.querySelector(".panel-container"),
		panelHandler = function(e) {
			if (
				(e.target === panel && !panel.classList.contains("panel-inactive")) ||
				!e.currentTarget.contains(panelContainer)
			) {
				panel.classList.contains("panel-active")
					? panel.classList.toggle("panel-inactive")
					: panel.classList.add("panel-active");
			}
		}.bind(panel);
	panel.addEventListener("click", panelHandler, false);
	if (panelClose) panelClose.addEventListener("click", panelHandler, false);
	return panelHandler;
};

var panelHandlerLeft = setPanelHandler(document.querySelector("#panel1"));
document
	.querySelector(".panel-trigger-left")
	.addEventListener("click", panelHandlerLeft, false);

var panelHandlerRight = setPanelHandler(document.querySelector("#panel2"));
document
	.querySelector(".panel-trigger-right")
	.addEventListener("click", panelHandlerRight, false);

var panelHandlerTop = setPanelHandler(document.querySelector("#panel3"));
document
	.querySelector(".panel-trigger-top")
	.addEventListener("click", panelHandlerTop, false);

var panelHandlerBottom = setPanelHandler(document.querySelector("#panel4"));
document
	.querySelector(".panel-trigger-bottom")
	.addEventListener("click", panelHandlerBottom, false);
})();
