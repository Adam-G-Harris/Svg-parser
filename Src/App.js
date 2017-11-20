// Sorry about excessive comments... its very hard to stay sane when working with this much RegEx
window.onload = () => {

	// Triggered when state changes... aka 'They uploaded a file'
	document.getElementById('svgUpload').addEventListener('change', readFile);

	let outputDisplay = document.getElementById('displayList');

	// Renders selected file into str
	function readFile() {
		let svgFile = this.files[0];
		let reader = new FileReader();
		reader.addEventListener('loadend', function () {
			splitSvgTags(reader.result);
		});
		reader.readAsText(svgFile);
	};

	// Splits str into groups
	function splitSvgTags(str) {

		// Verifying str type
		if (typeof str !== 'string') {
			alert('Sorry... we had a uhh... error parsing? Deepest apologies m8.');
			return;
		}

		// This RegEx sucked to make
		let strToParsedArr = str.match(/(["'])(?:(?=(\\?))\2.)*?\1/g);
		formatPaths(strToParsedArr);
	};

	// Verifies paths
	function formatPaths(parsedArr) {

		// Making sure svgArr is correct format
		if (parsedArr instanceof Array) {

			// Checking if str contains certain characters
			parsedArr.map(path => {
				if (path.indexOf('M') !== -1) {
					if (path.match(/M/g).length > 1) {
						let temp = path.split(/(?=M)/g);
						temp.map(item => {
							if (item.indexOf('M') !== -1) {
								displayPaths(item);
							}
						});
					} else { displayPaths(path); }
				} else { return; }
			});
		} else {
			alert('Tbh I have no idea what went wrong here. Apologies m8...');
			return;
		}
	}

	// Displaying paths
	function displayPaths(paths) {
		let li = document.createElement('li');
		let liText = document.createTextNode(`<path d='${paths}' />`);
		li.appendChild(liText);
		outputDisplay.appendChild(li);
	}
};