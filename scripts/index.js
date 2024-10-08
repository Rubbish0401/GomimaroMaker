var previewData;

window.addEventListener("load", function (event) {
	document.getElementById("btn-gen").addEventListener("click", async function (event) {
		if (previewData) previewData.remove();

		let hue = document.getElementById("hue").value;
		let saturation = document.getElementById("saturation").value;
		let lightness = document.getElementById("lightness").value;
		let msg = document.getElementById("msg").value;

		let previewContainer = document.getElementsByClassName("preview-container")[0];
		let preview = document.getElementById("preview");

		previewData = createGomimaro(msg, hue, saturation, lightness);
		previewData.style.scale = previewContainer.offsetWidth / 1920;
		previewData.style.transformOrigin = "left top";

		preview.appendChild(previewData);

		preview.style.height = `${previewContainer.offsetWidth / 1920 * previewData.offsetHeight}px`;
	});

	document.getElementById("btn-reset").addEventListener("click", function(event){
		reset();
	});
	
	document.getElementById("btn-clear").addEventListener("click", function(event){
		clear();
	});
	
	document.addEventListener("input", function (event) {
		if (["hue", "saturation", "lightness"].indexOf(event.target.id) != -1) {
			let hue = document.getElementById("hue").value;
			let saturation = document.getElementById("saturation").value;
			let lightness = document.getElementById("lightness").value;

			document.getElementsByClassName("gomimaro-container")[0].style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		}
	});

	document.getElementById("btn-dl").addEventListener("click", function (event) {
		previewData.style.scale = 1;
		takeScreenshot(previewData, previewData.offsetWidth, previewData.offsetHeight, true);

		let previewContainer = document.getElementsByClassName("preview-container")[0];
		previewData.style.scale = previewContainer.offsetWidth / 1920;
	});

	document.getElementById("btn-share").addEventListener("click", async function (event) {
		let now = new Date();
		let filename = "gomimaro_" + [
			fillChars(String(now.getFullYear()), 4, "0"),
			fillChars(String(now.getMonth() + 1), 2, "0"),
			fillChars(String(now.getDate()), 2, "0"),
			fillChars(String(now.getHours()), 2, "0"),
			fillChars(String(now.getMinutes()), 2, "0"),
			fillChars(String(now.getSeconds()), 2, "0"),
			fillChars(String(now.getMilliseconds()), 3, "0"),
		].join("") + ".png";

		previewData.style.scale = 1;

		takeScreenshot(previewData, previewData.offsetWidth, previewData.offsetHeight, false).then(canvas => {
			let previewContainer = document.getElementsByClassName("preview-container")[0];
			previewData.style.scale = previewContainer.offsetWidth / 1920;

			canvas.toBlob(blob => {
				let file = new File([blob], filename, { type: blob.type });
				share("Gomimaro Maker", "", "https://rubbish0401.github.io/GomimaroMaker/", [file]);
			});
		});
	});

	window.addEventListener("resize", function(event){
		let previewContainer = document.getElementsByClassName("preview-container")[0];
		previewData.style.scale = previewContainer.offsetWidth / 1920;

		preview.style.height = `${previewContainer.offsetWidth / 1920 * previewData.offsetHeight}px`;
	});

	initialise();
});

function initialise(){
	reset();
	clear();
}

function reset(){
	document.getElementById("hue").value = 120;
	document.getElementById("saturation").value = 75;
	document.getElementById("lightness").value = 85;
	document.getElementById("msg").value = "";
}

function clear(){
	document.getElementById("btn-gen").click();
}