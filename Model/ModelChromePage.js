function getUID(url) {
	return hex_md5(url);
}

function ModelChromePage(title, url) {
	this.title = title;
	this.url = url;
	this.UID = getUID(url);
}