if((document.getElementsByClassName("formulaEditorOuter").length ==  1) || (document.getElementsByClassName("pbWizardBody").length ==  1)){
	var base = "https://mujud.github.io/betterformula/";
	loadStyles(base,["styles.bundle.css"])
	var devJs = [
				"main.bundle.js",
				"vendor.bundle.js",
				"scripts.bundle.js",
				"polyfills.bundle.js",
				"inline.bundle.js",
			];
	loadScripts(base,devJs);
}