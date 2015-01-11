function ControllerPopup(model, view) {
	this.model = model;
	this.view = view;
}

ControllerPopup.prototype.showChromePages = function() {
	this.view.renderChromeList(this.model.chromePages, this.model.tags);
};

ControllerPopup.prototype.init = function() {
	model.init(
		(function(controller) {
			return function() {
				controller.showChromePages();
			};
		})(this)
	);
};