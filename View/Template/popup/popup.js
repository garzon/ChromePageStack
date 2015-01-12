function selectTag_onchange(id) {
	var thisSelect = getSelect(id);
	var value = thisSelect.value;
	getCheckbox(id).checked = true;
	if(value == "new tag..") {
		var newEle = newInputText("tag_" + id, "default");
		newEle.className = "input-tag";
		var container = thisSelect.parentElement;
		$(thisSelect).hide();
		container.appendChild(newEle);
	}
}

var msgbox = document.getElementById("msgbox");
var chromeBox = document.getElementById("chromePages");
var stackBox = document.getElementById("stackPages");

var model = new ModelStackPages();
var view = new ViewPopup(msgbox, chromeBox, stackBox);
var controller = new ControllerPopup(model, view);

document.getElementById("btn_clear").addEventListener("click", function() { controller.clearStack.call(controller); });
document.getElementById("btn_push").addEventListener("click", function() { controller.pushStack.call(controller); });
document.getElementById("btn_pop").addEventListener("click", function() { controller.popStack.call(controller); });
document.getElementById("btn_reset").addEventListener("click", function() { controller.resetStack.call(controller); });

controller.init();