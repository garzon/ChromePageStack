function ModelStackPages() {
	this.chromePages = {};
	this.stackPages = {};
	this.tags = {};
}

ModelStackPages.prototype.loadChromePages = function(callback) {
	this.chromePages = {};
	chrome.tabs.query({}, function(tabs){
		for(var i in tabs){
			var tab = tabs[i];
			var newPage = new ModelChromePage(tab.title, tab.url);
			this.chromePages[newPage.UID] = newPage;
		}
		if(typeof(callback) != "undefined") callback();
	});
};

ModelStackPages.prototype.loadTags = function() {
	this.tags = {};
	for(var i in this.stackPages) {
		this.tags[this.stackPages[i].tag] = true;
	}
	this.tags["default"] = true;
};

ModelStackPages.prototype.loadStackPages = function(callback) {
	this.stackPages = {};
	chrome.storage.sync.get("stackPages", 
		(function(model){
			return function(obj){
				if(typeof(obj) != "undefined") this.stackPages = obj;
				else throw "Cannot load the stack.";
				model.loadTags();
				if(typeof(callback) != "undefined") callback();
			};
		})(this)
	);
};

ModelStackPages.prototype.saveStackPages = function(callback) {
	chrome.storage.sync.set({ "stackPages": this.stackPages }, function(){
		if(typeof(callback) != "undefined") callback();
	});
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