export class Mode {
	public static factory(require){
		var oop = require("ace/lib/oop");
    	var TextMode = require("ace/mode/text").Mode;
    	var HighlightRules = require("ace/mode/betterformula_highlight_rules").BetterformulaHighlightRules;
		var MatchingBraceOutdent = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent;
    	var betterformulaCompletions = require("ace/mode/betterformula_completions").BetterformulaCompletions;
		var FoldMode = require("ace/mode/folding/better_formula_fold_mode").FoldMode;
		var betterFormulaMode = function(){
    		    this.HighlightRules = HighlightRules;
    		    this.$outdent = new MatchingBraceOutdent();
    		    this.foldingRules = new FoldMode();
    		    this.$completer = new betterformulaCompletions();
		}
		oop.inherits(betterFormulaMode, TextMode);
		(function() {
		    this.getCompletions = function(state, session, pos, prefix) {
		        return this.$completer.getCompletions(state, session, pos, prefix);
		    };
		    this.$id = "ace/mode/betterformula"
		}).call(betterFormulaMode.prototype);

		return betterFormulaMode
	}
}
