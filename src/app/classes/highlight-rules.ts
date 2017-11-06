declare var fieldTreeController
export class HighlightRules  {
    private static buildFields(){
        var fields = ""
        fieldTreeController.tree.rootList[0].children.forEach( el => {
            fields +=el.key+"|"
            if(el.attributes.type == "Lookup" && !el.isLeaf){
                fields += this.buildChildrenKeyWord(el)
            }
        })
        for(var i = 1 ; i <  fieldTreeController.tree.rootList.length ; i++){
            fields +=fieldTreeController.tree.rootList[i].key+"|"
            fieldTreeController.tree.rootList[i].children.forEach( childEl => {
                fields += childEl.key+"|"
            })
        }
        return fields.substring(0, fields.length - 1);
    }
    private static buildChildrenKeyWord(el){
        var fields = "";
        el.children.forEach( childEl => {
            var isValid = true
            var type = childEl.attributes.type
            var val = childEl.key
            if(!childEl.isLeaf && type == "Lookup"){
                if(childEl.hasOwnProperty("children"))
                    this.buildChildrenKeyWord(el)
                else
                    isValid = false
            }
            if(isValid)
                fields += val+"|"
        })
        return fields;
    }
    public static factory(require){
        var oop = require("ace/lib/oop");
        var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
        var that = this
        var betterformulaHighlightRules = function(){
            var keywords = (
            "BEGINS|BLANKVALUE|BR|CASE|CASESAFEID|CEILING|CONTAINS|DATE|DATEVALUE|DATETIMEVALUE|DAY|DISTANCE|EXP|FIND|FLOOR|GEOLOCATION|GETRECORDIDS|GETSESSIONID|HTMLENCODE|HYPERLINK|IMAGE|INCLUDE|INCLUDES|ISBLANK|ISCLONE|ISNEW|ISNULL|ISNUMBER|JSENCODE|JSINHTMLENCODE|JUNCTIONIDLIST|SUBSTITUTE|LEFT|LEN|LINKTO|LOWER|MAX|MID|Min|MONTH|NOW|NULLVALUE|PRIORVALUE|REGEX|SUBSTITUTE"
            );
            var builtinConstants = (
                "true|null|false|inf|Inf|nan|NaN|eps|pi|ans|nargin|nargout|varargin|varargout"
            );
            var builtinFunctions = (
                "abs|accumarray"
            );
            var keywordMapper = this.createKeywordMapper({
                "support.function": builtinFunctions,
                "keyword": keywords,
                "constant.language": builtinConstants,
                "formulafunction": "Oppo",
                "fields": that.buildFields()
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
