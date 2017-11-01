import { Injectable } from '@angular/core';
import { HighlightRules } from '../classes/highlight-rules';
import { Mode } from '../classes/mode';
import { Completions } from '../classes/completions';
@Injectable()
export class AceService {
  public init(){
    var define = (ace as any).define
  	define('ace/mode/betterformula_highlight_rules', function(require, exports, module) {
    		exports.BetterformulaHighlightRules = HighlightRules.factory(require)
  	})
    define('ace/mode/betterformula_completions', function(require, exports, module) {
        exports.BetterformulaCompletions = Completions.factory(require)
    })
  	define('ace/mode/betterformula', function(require, exports, module) {
    		exports.Mode = Mode.factory(require)
  	})
  	ace.require("ace/mode/betterformula")
  	ace.require("ace/ext/language_tools");
    var editor = ace.edit("bt-frmla");
    editor.setTheme("ace/theme/idle_fingers");
    editor.session.setMode("ace/mode/betterformula");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: false,
        enableLiveAutocompletion: false
    });
  }
}
// temp1.$highlightRules.setKeywords(JSON.parse('{"keyword": "first|items|editor"}'))
// temp2.session.bgTokenizer.start(0)