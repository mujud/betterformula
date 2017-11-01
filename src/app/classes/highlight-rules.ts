export class HighlightRules  {
    public static factory(require){
        var oop = require("ace/lib/oop");
        var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
        var betterformulaHighlightRules = function(){
            var keywords = (
            "DATE|DATEVALUE|CASE|BR|IF|HYPERLINK|CONTAINS|CEILING"
            );
            var builtinConstants = (
                "true|false|inf|Inf|nan|NaN|eps|pi|ans|nargin|nargout|varargin|varargout"
            );
            var builtinFunctions = (
                "abs|accumarray"
            );
            var keywordMapper = this.createKeywordMapper({
                "support.function": builtinFunctions,
                "keyword": keywords,
                "constant.language": builtinConstants
            }, "identifier", true);
            this.$rules = {
                    // allowQstring
                    start: [{ 
                        token : "string",
                        regex : "'",
                        stateName : "qstring",
                        next  : [{
                            token : "constant.language.escape",
                            regex : "''"
                        }, {
                            token : "string",
                            regex : "'|$",
                            next  : "start"
                        }, {
                            defaultToken: "string"
                        }]
                    }, {
                        token : "text",
                        regex : "\\s+"
                    }, {
                        regex: "",
                        next: "noQstring"
                    }],        
                    noQstring : [{
                        token : "string",
                        regex : '"',
                        stateName : "qqstring",
                        next  : [{
                            token : "constant.language.escape",
                            regex : /\\./
                        }, {
                            token : "string",
                            regex : "\\\\$",
                            next  : "qqstring"
                        }, {
                            token : "string",
                            regex : '"|$',
                            next  : "start"
                        }, {
                            defaultToken: "string"
                        }]
                    }, {
                        token : "constant.numeric", // float
                        regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                    }, {
                        token : keywordMapper,
                        regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                    }, {
                        token : "keyword.operator",
                        regex : "\\+|\\-|\\/|\\/\\/|&|\\^|~|<|>|<=|=>|==|!=|<>|=",
                        next: "start"
                    }, {
                        token : "punctuation.operator",
                        regex : "\\?|\\:|\\,|\\;|\\.",
                        next: "start"
                    }, {
                        token : "paren.lparen",
                        regex : "[({\\[]",
                        next: "start"
                    }, {
                        token : "paren.rparen",
                        regex : "[\\]})]"
                    }, {
                        token : "text",
                        regex : "\\s+"
                    }]
                };
                this.normalizeRules();
        }
        oop.inherits(betterformulaHighlightRules, TextHighlightRules);
        return betterformulaHighlightRules
    }
}
