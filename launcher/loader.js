if((document.getElementsByClassName("formulaEditorOuter").length ==  1) || (document.getElementsByClassName("pbWizardBody").length ==  1)){
	var base = "https://localhost:4200/";
	var devJs = [
				"main.bundle.js",
				"vendor.bundle.js",
				"styles.bundle.js",
				"scripts.bundle.js",
				"polyfills.bundle.js",
				"inline.bundle.js",
				"https://code.jquery.com/jquery-3.2.1.min.js",
			];
	loadScripts(base,devJs);
}