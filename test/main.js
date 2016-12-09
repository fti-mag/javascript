window.onload = function () {
	var trunk = new Branch('Trunk');
	document.body.appendChild(trunk.elem);

	var branch = new Branch('Branch_1');
	trunk.add(branch);
	branch.add(new Branch('Branch_1_1'));

	var branch = new Branch('Branch_2');
	branch.add(new Branch('Branch_2_1'));
	trunk.add(branch);

	var branch = new Branch('Branch_3');
	var j = 0;
	branch.holdover(function (callback) {
		setTimeout(function () {
			if(j < 2) {
				callback('error', 'click ' + (2 - j) + ' more times', null);
				j += 1;
			} else {
				var arr = new Array();
				for(var i = 0; i < 10; ++i) {
					arr.push(new Branch('Branch_3_' + i));
				}
				callback('ok', '', arr);
			}
		}, 1000);
	});
	trunk.add(branch);
}