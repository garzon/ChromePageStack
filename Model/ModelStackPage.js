function ModelStackPage(chromePage, newTitle, tag) {
	ModelChromePage.call(this, newTitle, chromePage.url);
	this.tag = tag;
}

