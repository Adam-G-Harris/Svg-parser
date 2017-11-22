// Sorry about excessive comments... its very hard to stay sane when working with this much RegEx
window.onload = () => {

	// Triggered on state change
	document.getElementById('svgUpload').addEventListener('change', readFile);

	// Where output is displayed
	let outputDisplay = document.getElementById('displayContainer');

	// Renders selected file into str
	function readFile() {
		let reader = new FileReader();
		reader.addEventListener('loadend', function () {
			parseFile(reader.result);
		});
		reader.readAsText(this.files[0]);
	};

	// Splits str into manageable groups
	function parseFile(str) {

		// Verifying str type
		if (typeof str !== 'string') {
			alert('Sorry... we had a uhh... error parsing?');
			return;
		}

		// RegEx is a blast  -_-
		let newParsedArr = str.match(/['"].*?['"]/g).map(item => {
			return item.replace(/['"]/g, "");
		});
		formatPaths(newParsedArr);
	};

	// Verifies paths
	function formatPaths(parsedArr) {

		// Making sure svgArr is an array
		if (parsedArr instanceof Array) {

			// Path checking and formatting
			parsedArr.map(path => {
				path.split(/(?=M)/g).map(item => {
					if (item.indexOf('M') !== -1) {
						displayPaths(item);
					}
				});
			});
		} else {
			alert('Seems like we had an error parsing, please make sure the file is the correct format and try again.');
		}
	}

	// Displaying paths
	function displayPaths(paths) {
		let p = document.createElement('p');
		let text = document.createTextNode(`<path d="${paths}" />`);
		p.appendChild(text);
		outputDisplay.value += p.textContent + '\n';
	}

	// Copies the outputted paths
	document.getElementById('copyAll').addEventListener('click', function () { // CHANGE THIS TO USE ARROW FUNCTION
		alert('trying');
		let copyText = document.getElementById('displayContainer');
		copyText.select();
		document.execCommand('Copy');
		alert('All the paths are copied to your clipboard, enjoy :)');
	});

}; // End