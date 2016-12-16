function recurse(key, value, stack) {
	var branch = new Branch('');
	var header = key + ': ';

	if(value == null) {
		header += null;
	} else {
		if(typeof value === 'object') {
			var obj = value;
			var loop = false;
			var level = 0;
			for(var i = 0; i < stack.length; ++i) {
				if(stack[i] === obj) {
					loop = true;
					level = i;
					break;
				}
			}
			if(loop) {
				header += 'Recursion to level ' + stack.length;
			} else {
				stack.push(obj);
				
				header += obj;

				if(obj.__proto__ != undefined) {
					branch.add(recurse('__proto__', obj.__proto__, stack));
				}
				console.log(obj);
				for(var key in obj) {
					if(obj.hasOwnProperty(key)) {
						console.log(key);
						branch.add(recurse(key, obj[key], stack));
					}
				}

				stack.pop();
			}
		} else {
			header += value;
		}
	}

	branch.header.set(header);
	return branch;
}

window.onload = function () {
	var trunk = recurse('window', window, new Array());
	document.body.appendChild(trunk.elem);
	
}