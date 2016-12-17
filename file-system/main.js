function escapeHtml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

window.onload = function () {
	var trunk = new Branch('/');
	document.body.appendChild(trunk.elem);

	var create = function (path) {
		return function (callback) {
			$.post('/cgi-bin/dirs.rb', 'path=' + encodeURIComponent(path)).done(function(data, status) {
				console.log(data);
				var branches = [];
				var content = null;
				try {
					content = JSON.parse(data).content;
				} catch(ex) {
					callback('json error', 'click to reload', null);
				}
				if(content) {
					for(var i in content) {
						dir = content[i];
						var branch = new Branch(escapeHtml(dir.name));
						if(dir.size != 0) {
							branch.holdover(create(path + '/' + dir.name));
						}
						branches.push(branch);
					}
					callback('ok', '', branches);
				}
			}).fail(function(jqxhr, status) {
				callback(status, 'click to reload', null);
			});
		};
	};

	trunk.holdover(create('/'));
}