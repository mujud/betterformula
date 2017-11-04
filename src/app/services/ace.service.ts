import { Injectable } from '@angular/core';
import { HighlightRules } from '../classes/highlight-rules';
import { Mode } from '../classes/mode';
import { Completions } from '../classes/completions';
import { MatchingBraceOutdent } from '../classes/matching-brace-outdent';
import { FoldMode } from '../classes/fold-mode';
import { BaseFoldMode } from '../classes/base-fold-mode';
declare var $
@Injectable()
export class AceService {
  editor

  public init(el: HTMLInputElement){
    var define = (ace as any).define
    define('ace/mode/folding/fold_mode', function(require, exports, module) {
        exports.FoldMode = BaseFoldMode.factory(require)
    })
    define('ace/mode/folding/better_formula_fold_mode', function(require, exports, module) {
        exports.FoldMode = FoldMode.factory(require)
    })
    define('ace/mode/matching_brace_outdent', function(require, exports, module) {
        exports.MatchingBraceOutdent = MatchingBraceOutdent.factory(require)
    })
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
    this.editor = ace.edit("bt-frmla");
    this.editor.setTheme("ace/theme/idle_fingers");
    this.editor.session.setMode("ace/mode/betterformula");
    this.editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: false,
        enableLiveAutocompletion: false
    });
    this.editor.setValue(el.value,1)
    this.editor.getSession().on('change', _ =>{ 
      el.value = this.editor.getValue()
      
    })
    this.editor.getSelection().on('changeCursor', _ =>{ 
      var position = this.editor.getCursorPosition()
      var selectionStart = position.column;
      var text = el.value.split("\n")
      for(var i = 0; i < position.row; i++ ){
        selectionStart += text[i].length
        selectionStart++//for county new line character
      }
      console.log("length is:"+selectionStart)
      console.log($(el))
      $(el)[0].selectionStart = selectionStart
      $(el)[0].selectionEnd = selectionStart
    })
    $(document).on("click","#fieldInsertButton",_ =>this.editor.setValue(el.value,1))
    console.log(this.editor)
  }
  public recalculate(){
    this.editor.session.bgTokenizer.start(0)
  }
}