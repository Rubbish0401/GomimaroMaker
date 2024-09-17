var previewData;

window.addEventListener("load", function(event){
	if(previewData) URL.revokeObjectURL(previewData);

	document.getElementById("btn-gen").addEventListener("click", async function(event){
		let hue = document.getElementById("hue").value;
		let msg = document.getElementById("msg").value;

		let previewContainer = document.getElementsByClassName("preview-container")[0];

		let gomimaro = createGomimaro(msg, hue);
		gomimaro.style.transform = `scale(${previewContainer.offsetWidth / 1920})`;
		gomimaro.style.transformOrigin = "left top";

		if(previewContainer.children.length > 0) previewContainer.children[0].remove();
		previewContainer.appendChild(gomimaro);
	});
	document.getElementById("btn-gen").click();

	document.addEventListener("input", function(event){
		if(["hue", "saturation", "lightness"].indexOf(event.target.id) != -1){
			let hue = document.getElementById("hue").value;
			let saturation = document.getElementById("saturation").value;
			let lightness = document.getElementById("lightness").value;

			document.getElementsByClassName("preview-container")[0].children[0].style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		}
	});
});