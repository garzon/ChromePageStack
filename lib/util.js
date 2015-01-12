function newTextNode(text) {
	return document.createTextNode(text);
}

function newHr() {
	return document.createElement("hr");
}

function newLink(url, title) {
	var res = document.createElement("a");
	res.target = "_blank";
	res.href = url;
	res.innerHTML = title;
	return res;
}

function newCheckbox(id, children, chk_onclick) {
	var res = document.createElement("p");
	var chk = document.createElement("input");
	chk.type = "checkbox";
	chk.id = "chkbox_" + id;
	res.appendChild(chk);
	var nodes = document.createElement("span");
	nodes.className = "span-text";
	for(var i in children)
		nodes.appendChild(children[i]);
	res.appendChild(nodes);
	if(typeof(chk_onclick) != "undefined")
		chk.addEventListener("click", chk_onclick);
	return res;
}

function newInputText(id, value) {
	var res = document.createElement("input");
	res.type = "text";
	res.id = "txt_" + id;
	res.value = value;
	return res;
}

function newSelect(id, options) {
	var res = document.createElement("select");
	res.id = "sel_" + id;
	for(var i in options) {
		var option = options[i];
		var newEle = document.createElement("option");
		newEle.value = option;
		newEle.innerHTML = option;
		res.appendChild(newEle); 
	}
	return res;
}

function getCheckbox(id) {
	return document.getElementById("chkbox_" + id);
}

function getInputText(id) {
	return document.getElementById("txt_" + id);
}

function getSelect(id) {
	return document.getElementById("sel_" + id);
}

function isEmptyObject(obj) {  // hacky method:  "{}".length == 2
	return JSON.stringify(obj).length == 2;
}