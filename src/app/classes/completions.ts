export class Completions {
	public static factory(require){
		function is(token, type) {
		    return token.type.lastIndexOf(type) > -1;
		}
		var BetterformulaCompletions = function() {};
		(function() {

		    this.getCompletions = function(state, session, pos, prefix) {
		        var token = session.getTokenAt(pos.row, pos.column);
		        console.log("tokern--->")
		        console.log(token)
		        return this.getFunctionCompletions(state, session, pos, prefix);

		    };

		    this.getFunctionCompletions = function(state, session, pos, prefix) {
		        var line = session.getLine(pos.row).substr(0, pos.column);
		        var functions = Object.keys(functionMap);
		        return functions.map(function(func){
		            return {
		                caption: func,
		                snippet: functionMap[func][0],
		                meta: functionMap[func][1],
		                score: Number.MAX_VALUE,
		                docHTML: functionMap[func][2]
		            };
		        });
		    };

		}).call(BetterformulaCompletions.prototype);

		var functionMap = {
		    "DATE": [
		        "DATE(\n\t${1:year},\n\t${2:month},\n\t${3:day}\n)",
		        "Date function",
		        "Returns a date value from year, month, and day values you enter. "
		    ],
		    "DATEVALUE": [
		        "DATEVALUE(${0:expression})",
		        "Date function",
		        "Returns a date value for a date/time or text expression."
		    ],
		    "BR": [
		        "BR()",
		        "Format function",
		        "Inserts a line break in a string of text. "
		    ],
		    "CASE": [
		        "CASE(${1:expression},${2:value1},${3:result1})",
		        "Conditional function",
		        "Checks a given expression against a series of values. If the expression is equal to a value, returns the corresponding result. If it is not equal to any values, it returns the else_result."
		    ],
		    "CEILING": [
		        "CEILING(${0:number})",
		        "Number function",
		        "Rounds a number up to the nearest integer."
		    ],
		    "CONTAINS": [
		        "CONTAINS(${1:field},${2:string})",
		        "Number function",
		        "Compares two arguments of text and returns TRUE if the first argument contains the second argument. If not, returns FALSE."
		    ],
		    "HYPERLINK": [
		        "HYPERLINK(${1:url},${2:friendly_name},${3:target})",
		        "Number function",
		        "Creates a link to a URL specified that is linkable from the text specified."
		    ],
		    "IF": [
		        "IF(${1:logical_test},${2:value_if_true},${3:value_if_false})",
		        "Conditional function",
		        "Determines if expressions are true or false. Returns a given value if true and another value if false."
		    ],
		    "SUBSTITUTE": [
		        "SUBSTITUTE(${1:text},${2:old_text},${3:new_text})",
		        "Text function",
		        "Substitutes new text for old text in a text string."
		    ],
		};
		return BetterformulaCompletions;
	}
}