var showContent = function(contentID) {
	var nodes = document.getElementsByClassName("content");

	for(var i = 0; i<nodes.length; i++) {
		if(nodes[i].id === contentID) {
			nodes[i].style.display = "block";
		} else {
			nodes[i].style.display = "hidden";
		}
	}
}
