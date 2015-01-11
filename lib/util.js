function newCheckbox(id, children) {
	var res = document.createElement("p");
	var chk = document.createElement("input");
	chk.type = "checkbox";
	chk.id = "chkbox_" + id;
	res.appendChild(chk);
	for(var i in children)
		res.appendChild(children[i]);
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
