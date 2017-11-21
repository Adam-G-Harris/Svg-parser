// Sorry about excessive comments... its very hard to stay sane when working with this much RegEx
window.onload = () => {

	// Triggered on state change
	document.getElementById('svgUpload').addEventListener('change', readFile);

	let outputDisplay = document.getElementById('displayList');

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

		// Splitting str at quotes, then removing outside quotes
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
		let li = document.createElement('li');
		let liText = document.createTextNode(`<path d="${paths}" />`);
		li.appendChild(liText);
		outputDisplay.appendChild(li);
	}
};