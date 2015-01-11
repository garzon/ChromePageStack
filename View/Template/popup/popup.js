function selectTag_onchange(id) {
	var thisSelect = getSelect(id);
	var value = thisSelect.value;
	if(value == "new tag..") {
		var newEle = newInputText("tag_" + id, "default");
		var container = thisSelect.parentElement;
		thisSelect.hidden = "hidden";
		container.appendChild(newEle);
	}
}

var msgbox = document.getElementById("msgbox");
var chromeBox = document.getElementById("chromePages");
var stackBox = document.getElementById("stackPages");

var model = new ModelStackPages();

var view = new ViewPopup(msgbox, chromeBox, stackBox);

var controller = new ControllerPopup(model, view).init();