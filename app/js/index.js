console.log('Up and running!');

class MainController {
	constructor() {
		console.log('constructor');
		this.user = {
			name: 'Ali',
		};
	}

	fileClaim() {
		console.log('fileClaim');
		window.location = 'claimPage.html';
	}
	manageClaim() {
		console.log('manageClaim');
		window.location = 'userPage.html';
	}

	dropHandler(ev) {
		console.log('dropHandler ', ev);
	}
}


const controller = new MainController();

// let dropArea = document.getElementById('drop-area');
//
// dropArea.addEventListener('dragenter', handlerFunction, false);
// dropArea.addEventListener('dragleave', handlerFunction, false);
// // dropArea.addEventListener('dragover', handlerFunction, false);
// dropArea.addEventListener('drop', handlerFunction, false);
//
// function handlerFunction(e) {
//     e.preventDefault();
//     e.stopPropagation();
// 	console.log('handlerFunction');
// }


if (window.FileReader) {
	let drop;
	addEventHandler(window, 'load', () => {
		drop = document.getElementById('drop-area');

		function cancel(e) {
			if (e.preventDefault) { e.preventDefault(); }
			return false;
		}

        // Tells the browser that we *can* drop on this target
		addEventHandler(drop, 'dragover', cancel);
		addEventHandler(drop, 'dragenter', cancel);

		addEventHandler(drop, 'drop', dropHandler);
		Function.prototype.bindToEventHandler = function bindToEventHandler() {
			const handler = this;
			const boundParameters = Array.prototype.slice.call(arguments);
            // create closure
			return function (e) {
				e = e || window.event; // get window.event if e argument missing (in IE)
				boundParameters.unshift(e);
				handler.apply(this, boundParameters);
			};
		};
	});
} else {
	document.getElementById('status').innerHTML = 'Your browser does not support the HTML5 FileReader.';
}

function addEventHandler(obj, evt, handler) {
	if (obj.addEventListener) {
        // W3C method
		obj.addEventListener(evt, handler, false);
	} else if (obj.attachEvent) {
        // IE method.
		obj.attachEvent(`on${evt}`, handler);
	} else {
        // Old school method.
		obj[`on${evt}`] = handler;
	}
}


function dropHandler(e) {
	e = e || window.event; // get window.event if e argument missing (in IE)
	if (e.preventDefault) { e.preventDefault(); } // stops the browser from redirecting off to the image.

	const dt = e.dataTransfer;
	const files = dt.files;
   	uploadHandler(files);
}

function uploadHandler(files) {
	const list = document.getElementById('list');
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const reader = new FileReader();

        // attach event handlers here...

		reader.readAsDataURL(file);
		addEventHandler(reader, 'loadend', function (e, file) {
			const bin = this.result;
			const newFile = document.createElement('div');
			const icon = document.createElement('img');
			const fileName = document.createElement('span');
			icon.className = 'icon';
			icon.src = './assets/img/icons/image-file_32.svg';
			if (file.type === 'application/pdf') {
				icon.src = './assets/img/icons/pdf-file_32.svg';
			}
			// newFile.innerHTML = `${file.name} size ${file.size} B`;
			fileName.innerHTML = file.name;
			newFile.appendChild(icon);
			newFile.appendChild(fileName);
			list.appendChild(newFile);

			// const img = document.createElement('img');
			// img.file = file;
			// img.src = bin;
			// list.appendChild(img);
		}.bindToEventHandler(file));
	}
	return false;
}
