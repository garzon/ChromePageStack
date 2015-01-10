var savedList = [];
var currentList = [];

getCurrentList();

chrome.tabs.query({}, function(tabs){
	var ele=document.getElementById("curr");
	ele.innerHTML="";
	for(var i in tabs){
		var tab=tabs[i];
		var node=document.createElement("li");
		node.innerHTML=tab.url;
		ele.appendChild(node);
	}
});