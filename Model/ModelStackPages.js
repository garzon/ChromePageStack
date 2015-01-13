function ModelStackPages() {
	this.chromePages = {};
	this.stackPages = {};
	this.tags = {};
}

ModelStackPages.prototype.loadChromePages = function(callback) {
	this.chromePages = {};
	var model = this;
	chrome.tabs.query({}, function(tabs){
		for(var i in tabs){
			var tab = tabs[i];
			var newPage = new ModelChromePage(tab.title, tab.url);
			model.chromePages[newPage.UID] = newPage;
		}
		if(typeof(callback) != "undefined") callback();
	});
};

ModelStackPages.prototype.loadTags = function() {
	this.tags = {};
	for(var i in this.stackPages) {
		this.tags[i] = true;
	}
	this.tags["default"] = true;
};

ModelStackPages.prototype.loadStackPages = function(callback) {
	this.stackPages = {};
	var model = this;
	chrome.storage.sync.get("stackPages", function(obj){
		if(typeof(obj) != "undefined") {
			if(obj.hasOwnProperty("stackPages"))
				model.stackPages = obj["stackPages"];
			else
				model.stackPages = {};
		} else throw "Cannot load the stack.";
		model.loadTags();
		if(typeof(callback) != "undefined") callback();
	});
};

ModelStackPages.prototype.saveStackPages = function(callback) {
	chrome.storage.sync.set({ "stackPages": this.stackPages }, function(){
		if(typeof(callback) != "undefined") callback();
	});
};

ModelStackPages.prototype.clearStack = function(callback) {
	this.stackPages = {};
	this.saveStackPages(callback);
};

ModelStackPages.prototype.pushStackPage = function(stackPage) {
	if(!(this.stackPages.hasOwnProperty(stackPage.tag)))
		this.stackPages[stackPage.tag] = {};
	this.stackPages[stackPage.tag][stackPage.UID] = stackPage;
};

ModelStackPages.prototype.openNewTab = function(chromePage, callback) {
	var info = {
		url: chromePage.url,
		active: false
	};
	chrome.tabs.create(info, callback);
};

ModelStackPages.prototype.resetStackPage = function(tag, UID) {
	if(typeof(this.stackPages[tag][UID]) != "undefined")
		delete(this.stackPages[tag][UID]);
	if(isEmptyObject(this.stackPages[tag]))
		delete(this.stackPages[tag]);
};

ModelStackPages.prototype.popStackPage = function(tag, UID, callback) {
	this.openNewTab(this.stackPages[tag][UID], callback);
	this.resetStackPage(tag, UID);
};

ModelStackPages.prototype.init = function(callback) {
	var i = 0;
	var superCallback = function() {
		i += 1;
		if(i==2)
			if(typeof(callback) != "undefined")
				callback();
	};
	this.loadChromePages(superCallback);
	this.loadStackPages(superCallback);
};