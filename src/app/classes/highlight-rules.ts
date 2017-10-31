import { Injectable } from '@angular/core';
export class HighlightRules {
	constructor(){
		this.normalizeRules()
	}
	public setKeywords = function(kwMap) {     
       this.keywordRule.onMatch = this.createKeywordMapper(kwMap, "identifier")
	}
	public keywordRule: Object  = {
       regex : "\\w+",
       onMatch : function() {return "text"}
	}
	public $rules: Object = {
        "start" : [ 
            {
                token: "string",
                start: '"', 
                end: '"',
                next: [{ token : "constant.language.escape.lsl", regex : /\\[tn"\\]/}]
            },
            this.keywordRule
        ]
   }
   public normalizeRules = function(){

   }
}
