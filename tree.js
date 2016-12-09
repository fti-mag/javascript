function BranchHeader(text) {
	this.elem = document.createElement('div');
	this.elem.classList.add('branch_header');
	this.elem.innerHTML = text;
}

function BranchContent() {
	this.branches = new Array();
	this.elem = document.createElement('div');
	this.elem.classList.add('branch_content');

	this.add = function (branch) {
		this.branches.push(branch);
		this.elem.appendChild(branch.elem);
	};

	this.open = function () {
		this.elem.classList.remove('closed');
	};

	this.close = function () {
		this.elem.classList.add('closed');
	};
}

function BranchExpander() {
	this.elem = document.createElement('td');
	this.elem.classList.add('branch_expander');

	this.enter = function () {
		this.elem.style.backgroundColor = '#EE2211';
	};

	this.leave = function () {
		this.elem.style.backgroundColor = '#FFEE22';
	};

	this.leave();

	this.update = function (state) {
		this.elem.innerHTML = state;
	}

	this.update('empty');
}

function build_table(exp, hdr, msg, cnt) {
	var table = document.createElement('table');
	table.classList.add('branch_table');

	var tr = document.createElement('tr');
	table.appendChild(tr);
	
	tr.appendChild(exp);

	var td2 = document.createElement('td');
	td2.style.padding = '0';
	tr.appendChild(td2);
	td2.appendChild(hdr);
	td2.appendChild(msg);
	td2.appendChild(cnt);

	return table;
}

function Branch(header) {
	this.elem = document.createElement('div');
	this.elem.classList.add('branch');

	this.content = new BranchContent();

	this.header = new BranchHeader(header, this.content.closer);

	this.expander = new BranchExpander(this.content.closer);

	this.message = document.createElement('div');
	this.message.classList.add('branch_message');

	this.elem.appendChild(build_table(
		this.expander.elem, 
		this.header.elem, 
		this.message,
		this.content.elem
	));

	this.add = function (branch) {
		this.content.add(branch);
		this.expander.update('+');
	};

	// hover

	this.enter = function () {
		this.expander.enter();
	};
	this.elem.onmouseenter = this.enter.bind(this);

	this.leave = function () {
		this.expander.leave();
	};
	this.elem.onmouseleave = this.leave.bind(this);

	// open-close

	this.opened = false;

	this.open = function () {
		if(!this.lazy) {
			this.content.open();
			
			if(this.content.branches.length > 0) {
				this.expander.update('-');
			} else {
				this.expander.update('');
			}

			this.opened = true;
		} else {
			this.expander.update('*');
			this.message.innerHTML = 'loading...';
			this.loader((function (status, message, branches) {
				if(status == 'ok') {
					this.message.innerHTML = '';
					for(var i = 0; i < branches.length; ++i) {
						this.add(branches[i]);
					}
					this.lazy = false;
					this.open();
				} else {
					this.message.innerHTML = status + ': ' + message;
					this.expander.update('+');
				}
			}).bind(this));
		}
	};

	this.close = function () {
		this.content.close();

		if(this.content.branches.length > 0) {
			this.expander.update('+');
		} else {
			this.expander.update('');
		}

		this.opened = false;
	};

	var toggle = (function () {
		if(this.opened) {
			this.close();
		} else {
			this.open();
		}
	}).bind(this);

	this.header.elem.onclick = toggle;
	this.expander.elem.onclick = toggle;

	this.close();

	// lazy

	this.lazy = false;

	this.holdover = function (loader) {
		this.lazy = true;
		this.loader = loader;
		this.expander.update('+');
	}
}