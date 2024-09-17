function createGomimaro(msg = "", hue = 120, saturation = 75, lightness = 85){
	let container = document.createElement("div");

	let msgBase = document.createElement("div");
	let msgFrame = document.createElement("div");
	let msgItem = document.createElement("span");

	let filler = document.createElement("div");

	let footer = document.createElement("div");
	let icon = document.createElement("img");

	container.className = "gomimaro-container";
	container.style.background = `hsl(${hue} ${saturation} ${lightness})`;

	msgBase.className = "gomimaro-column gomimaro-msg-base";
	msgFrame.className = "gomimaro-msg-frame";
	msgItem.className = "gomimaro-msg";
	msgItem.innerText = msg;

	filler.className = "gomimaro-column";
	filler.style.height = "32px";

	footer.className = "gomimaro-column gomimaro-footer";
	icon.className = "gomimaro-icon";
	icon.src = "src/images/png/rounded_paper_64.png";

	container.appendChild(msgBase);
	container.appendChild(filler);
	container.appendChild(footer);

	msgBase.appendChild(msgFrame);
	msgFrame.appendChild(msgItem);

	footer.appendChild(icon);

	return container;
}