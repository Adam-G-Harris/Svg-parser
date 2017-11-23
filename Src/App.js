// Sorry about excessive comments... its very hard to stay sane when working with this much RegEx
window.onload = () => {

	// Event triggered on state change
	document.getElementById('svgUpload').addEventListener('change', readFile);

	// Grabbing various DOM elements
	let outputDisplay = document.getElementById('displayContainer');
	let noFilesSelected = document.getElementById('noFilesSelected');
	let toggleDisplay = document.getElementById('copyAll');
	toggleDisplay.addEventListener('click', copyAndToggle);

	// Renders selected file into str
	function readFile() {
		let reader = new FileReader();
		reader.addEventListener('loadend', () => {
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

			// Toggle displays
			toggleDisplay.style.display = 'inline-block';
			noFilesSelected.style.display = 'none';

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

	// Copies output and toggles elements display
	function copyAndToggle() {
		outputDisplay.select();
		document.execCommand('Copy');
		alert('All the paths are copied to your clipboard, enjoy :)');
	};

}; // End