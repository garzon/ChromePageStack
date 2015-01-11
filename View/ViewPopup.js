function ViewPopup(msgbox, chromeBox, stackBox) {
	this.msgbox = msgbox;
	this.chromeBox = chromeBox;
	this.stackBox = stackBox;
}

ViewPopup.newSelectTag = function(id, tags) {
	var res = newSelect(id, tags);
	res.onchange = "selectTag_onchange(" + id + ")";
	return res;
};

ViewPopup.newChromePage = function(id, title, tags) {
	var titleText = newInputText(id, title);
	var tagSelect = ViewPopup.newSelectTag(id, tags);
	return newCheckbox(id, [titleText, tagSelect]);
};

ViewPopup.getTagName = function(id) {
	var sel = getSelect(id);
	if(sel.value != "newTag_" + id) {
		return sel.value;
	} else {
		var val = getInputText("tag_" + id).value;
		if(val == "") val = "default";
		return val;
	}
};

ViewPopup.prototype.renderChromeList = function(chromePages, tags) {
	this.chromeBox.innerHTML = "";
	for(var i in chromePages) {
		var page = chromePages[i];
		var node = ViewPopup.newChromePage(i, page.title, tags);
		this.chromeBox.appendChild(node);
	}
}