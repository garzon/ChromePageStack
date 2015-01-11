function ViewPopup(msgbox, chromeBox, stackBox) {
	this.msgbox = msgbox;
	this.chromeBox = chromeBox;
	this.stackBox = stackBox;
}

ViewPopup.newSelectTag = function(id, tags) {
	var res = newSelect(id, tags);
	res.addEventListener('change', function() { selectTag_onchange(id); });
	return res;
};

ViewPopup.newHeader = function(text, htmlId, cssClass) {
	var node = document.createElement("p");
	node.className = cssClass;
	node.appendChild(newCheckbox(htmlId, [newTextNode(text)]));
	return node;
}

ViewPopup.newChromePage = function(id, title, tags) {
	var echoTags = [];
	for(var i in tags) {
		if(tags[i])
			echoTags.push(i);
	}
	echoTags.push("new tag..");

	var titleText = newInputText(id, title);
	var tagSelect = ViewPopup.newSelectTag(id, echoTags);

	return newCheckbox(id, [titleText, tagSelect]);
};

ViewPopup.newStackPage = function(id, url, title) {
	var link = newLink(url, title);
	return newCheckbox(id, [link]);
};

ViewPopup.prototype.getChecked = function(id) {  // static
	return getCheckbox(id).checked;
};

ViewPopup.prototype.getNewTitle = function(id) { // static
	return getInputText(id).value;
};

ViewPopup.prototype.getTagName = function(id) {  // static
	var sel = getSelect(id);
	if(sel.value != "new tag..") {
		return sel.value;
	} else {
		var val = getInputText("tag_" + id).value;
		if(val == "") val = "default";
		return val;
	}
};

ViewPopup.prototype.msg = function(msg) {
	this.msgbox.innerHTML = "";
	this.msgbox.appendChild(newTextNode(msg));
};

ViewPopup.prototype.renderChromeList = function(chromePages, tags) {
	this.chromeBox.innerHTML = "";
	this.chromeBox.appendChild(ViewPopup.newHeader("Can be saved:", "chromeList", "list-header"));
	this.chromeBox.appendChild(newHr());
	if(isEmptyObject(chromePages)) {
		this.chromeBox.appendChild(newTextNode("None"));
		return;
	}
	for(var i in chromePages) {
		var page = chromePages[i];
		var node = ViewPopup.newChromePage(i, page.title, tags);
		this.chromeBox.appendChild(node);
	}
};

ViewPopup.prototype.renderStackList = function(stackPages) {
	this.stackBox.innerHTML = "";
	this.stackBox.appendChild(ViewPopup.newHeader("Pages in stack:", "stackList", "list-header"));
	this.stackBox.appendChild(newHr());
	if(isEmptyObject(stackPages)) {
		this.stackBox.appendChild(newTextNode("None"));
		return;
	}
	for(var tag in stackPages) {
		var pages = stackPages[tag];
		var tagHeader = ViewPopup.newHeader("Tag: " + tag, "tagList_" + tag, "tag-header");
		this.stackBox.appendChild(tagHeader);
		var ul = newUl();
		for(var i in pages) {
			var li = newLi();
			var page = pages[i];
			var node = ViewPopup.newStackPage(i, page.url, page.title);
			li.appendChild(node);
			ul.appendChild(li);
		}
		this.stackBox.appendChild(ul);
	}
};