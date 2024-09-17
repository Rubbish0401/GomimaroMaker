var previewData;

window.addEventListener("load", function (event) {
	document.getElementById("btn-gen").addEventListener("click", async function (event) {
		let hue = document.getElementById("hue").value;
		let saturation = document.getElementById("saturation").value;
		let lightness = document.getElementById("lightness").value;
		let msg = document.getElementById("msg").value;

		let previewContainer = document.getElementsByClassName("preview-container")[0];
		let preview = document.getElementById("preview");

		previewData = createGomimaro(msg, hue, saturation, lightness);
		previewData.style.scale = previewContainer.offsetWidth / 1920;
		previewData.style.transformOrigin = "left top";

		if (previewData) previewData.remove();
		preview.appendChild(previewData);

		preview.style.height = `${previewContainer.offsetWidth / 1920 * previewData.offsetHeight}px`;
	});
	document.getElementById("btn-gen").click();

	document.addEventListener("input", function (event) {
		if (["hue", "saturation", "lightness"].indexOf(event.target.id) != -1) {
			let hue = document.getElementById("hue").value;
			let saturation = document.getElementById("saturation").value;
			let lightness = document.getElementById("lightness").value;

			document.getElementsByClassName("gomimaro-container")[0].style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		}
	});

	document.getElementById("btn-dl").addEventListener("click", function(event){
		previewData.style.scale = 1;
		takeScreenshot(previewData, previewData.offsetWidth, previewData.offsetHeight, true);

		let previewContainer = document.getElementsByClassName("preview-container")[0];
		previewData.style.scale = previewContainer.offsetWidth / 1920;
	});
});