function selectTag_onchange(id) {
	var thisSelect = getSelect(id);
	var value = thisSelect.value;
	if(value == "newTag_" + id) {
		var newEle = newInputText("tag_" + id, "default");
		var container = getCheckbox(id);
		thisSelect.hidden = "hidden";
		container.appendChild(newEle);
	}
}

var msgbox = document.getElementById("msgbox");
var chrome = document.getElementById("chromePages");
var stack = document.getElementById("stackPages");

var model = new ModelStackPages();

var view = new ViewPopup(msgbox, chrome, stack);

var controller = new ControllerPopup(model, view).init();