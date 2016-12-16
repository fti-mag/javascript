window.onload = function () {
	var trunk = new Branch('/');
	document.body.appendChild(trunk.elem);

	var create = function (path) {
		return function (callback) {
			$.ajax('/cgi-bin/dirs.rb?path=' + path).done(function(data, status) {
				branches = [];
				dir = JSON.parse(data);
				for(var i in dir.content) {
					file = dir.content[i];
					if(file.type == 'dir') {
						var branch = new Branch(file.name);
						branch.holdover(create(path + '/' + file.name));
						branches.push(branch);
					}
				}
				callback('ok', '', branches);
			}).fail(function(jqxhr, status) {
				callback(status, 'click to reload', null);
			});
		};
	};

	trunk.holdover(create('/'));
}