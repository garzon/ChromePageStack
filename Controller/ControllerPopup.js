function ControllerPopup(model, view) {
	this.model = model;
	this.view = view;
	this.echoPages = {};
}

ControllerPopup.prototype.clearStack = function() {
	var controller = this;
	this.model.clearStack(function() {
		controller.view.msg("Successfully clear the stack.");
		controller.init();
	});
};

ControllerPopup.prototype.pushStack = function() {
	for(var id in this.echoPages) {
		var flag = this.view.getChecked(id);
		if(flag) {
			var newPage = new ModelStackPage(this.echoPages[id], this.view.getNewTitle(id), this.view.getTagName(id));
			this.model.pushStackPage(newPage);
		}
	}
	var controller = this;
	this.model.saveStackPages(function() {
		controller.view.msg("Successfully save the pages.");
		controller.init();
	});
};

ControllerPopup.prototype.getStackSelected = function() {
	var tmpArray = [], counter = 0;
	for(var i in this.model.stackPages) {
		var pages = this.model.stackPages[i];
		for(var id in pages) {
			if(this.view.getChecked(id)) {
				counter += 1;
				tmpArray.push([i, id]);
			}
		}
	}
	return [tmpArray, counter];
};

ControllerPopup.prototype.popStack = function() {

	var res = this.getStackSelected();
	var tmpArray = res[0];
	var counter = res[1];

	var controller = this;
	var callback = function() {
		counter -= 1;
		if(counter == 0) {
			controller.model.saveStackPages(function() {
				controller.view.msg("Successfully pop the pages.");
				controller.init();
			});
		}
	};

	for(var i = 0; i < tmpArray.length; i++) {
		this.model.popStackPage(tmpArray[i][0], tmpArray[i][1], callback);
	}
};

ControllerPopup.prototype.resetStack = function() {
	var tmpArray = this.getStackSelected()[0];
	for(var i = 0; i < tmpArray.length; i++) {
		this.model.resetStackPage(tmpArray[i][0], tmpArray[i][1]);
	}
	var controller = this;
	this.model.saveStackPages(function() {
		controller.view.msg("Successfully reset.");
		controller.init();
	});
};

ControllerPopup.prototype.showChromePages = function() {
	this.echoPages = {};
	for(var i in this.model.chromePages) {
		this.echoPages[i] = this.model.chromePages[i];
	}
	for(var i in this.model.stackPages) {
		var pages = this.model.stackPages[i];
		for(var id in pages) {
			if(typeof(this.echoPages[id]) != "undefined") {
				delete(this.echoPages[id]);
			}
		}
	}
	this.view.renderChromeList(this.echoPages, this.model.tags);
};

ControllerPopup.prototype.showStackPages = function() {
	this.view.renderStackList(this.model.stackPages);
};

ControllerPopup.prototype.init = function() {
	var controller = this;
	model.init(function() {
		controller.showChromePages();
		controller.showStackPages();
	});
};