function newTreeNodeView(node) {
	var res = document.createElement("div");
	res.className = "tree-item";
	//res.appendChild(
	//	document.createElement("i");
	//);
		var item = document.createElement("div");
		item.className = "tree-item-name";
		item.appendChild(node);
	res.appendChild(item);
	return res;
}

function newTreeFolderView(titleNode, childrenNodes) {
	var folder = document.createElement("div");
	folder.className = "tree-folder";
		var header = document.createElement("div");
		header.className = "tree-folder-header";
		header.appendChild(
			document.createElement("i")
		);
			var headerName = document.createElement("div");
			headerName.className = "tree-folder-name";
			headerName.appendChild(titleNode);
		header.appendChild(headerName);
	folder.appendChild(header);
		var content = document.createElement("div");
		content.className = "tree-folder-content";
		for(var i in childrenNodes) {
			content.appendChild(childrenNodes[i]);
		}
	folder.appendChild(content);
	return folder;
}

function newTreeView(childrenNodes) {
	var tree = document.createElement("div");
	tree.className = "tree";
	for(var i in childrenNodes) {
		tree.appendChild(childrenNodes[i]);
	}
	return tree;
}