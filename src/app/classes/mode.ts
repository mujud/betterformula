export class Mode {
	public static factory(require){
		var oop = require("ace/lib/oop");
    	var TextMode = require("ace/mode/text").Mode;
    	var HighlightRules = require("ace/mode/betterformula_highlight_rules").BetterformulaHighlightRules;
    	var betterformulaCompletions = require("ace/mode/betterformula_completions").BetterformulaCompletions;
    	
		var betterFormulaMode = function(){
    		    this.HighlightRules = HighlightRules;
    		    //this.$outdent = new MatchingBraceOutdent();
    		    //this.foldingRules = new FoldMode();
    		    this.$completer = new betterformulaCompletions();
		}
		oop.inherits(betterFormulaMode, TextMode);
		(function() {
		    this.getCompletions = function(state, session, pos, prefix) {
    			console.log("completions");
		        return this.$completer.getCompletions(state, session, pos, prefix);
		    };
		    this.$id = "ace/mode/betterformula"
		}).call(betterFormulaMode.prototype);

		return betterFormulaMode
	}
}
