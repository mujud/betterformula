import { Injectable } from '@angular/core'
import { HighlightRules } from '../classes/highlight-rules'
import { Mode } from '../classes/mode'
import { Completions } from '../classes/completions'
import { MatchingBraceOutdent } from '../classes/matching-brace-outdent'
import { FoldMode } from '../classes/fold-mode'
import { BaseFoldMode } from '../classes/base-fold-mode'
declare var $
@Injectable()
export class AceService {
  private editor
  public init(el: HTMLInputElement){
    this.defineAceSyntax()
    this.initEditor(el)
    //inser listners
    $(document).on("click","#fieldInsertButton",_ =>setTimeout(() =>this.editor.setValue(el.value,1)))
    $("#insertOperatorMenu").on("click","a",_ =>setTimeout(() => this.editor.setValue(el.value,1)))
    $("input[name='addToFormula']").click(_ =>setTimeout(() => this.editor.setValue(el.value,1)))
  }
  private initEditor(el: HTMLInputElement){
    $("#bt-frmla").html(el.value)
    this.editor = ace.edit("bt-frmla")
    
    this.editor.setTheme("ace/theme/idle_fingers")
    this.editor.session.setMode("ace/mode/betterformula")
    this.editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: false,
        enableLiveAutocompletion: false
    })
    //this.editor.setValue(el.value,1)
    //update text area everytime the editor content to change to kee in sync
    this.editor.getSession().on('change', _ =>el.value = this.editor.getValue())
    //keep cursor position in sync between textarea and editor to allow for insert functionality
    this.editor.getSelection().on('changeCursor', _ => this.updateCursorPosition(el))
  }
  private updateCursorPosition(el){
      var position = this.editor.getCursorPosition()
      var selectionStart = position.column
      var text = el.value.split("\n")
      for(var i = 0; i < position.row; i++ ){
        selectionStart += text[i].length
        selectionStart++//count new line character
      }
      $(el)[0].selectionStart = selectionStart
      $(el)[0].selectionEnd = selectionStart
  }
  private defineAceSyntax(){
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
    var langTools = ace.require("ace/ext/language_tools")
    langTools.setCompleters(this.updateLanCompleter());
  }
  private updateLanCompleter = function(){
    return [{
      getCompletions: function(editor, session, pos, prefix, callback) {
        if (session.$mode.completer) {
            return session.$mode.completer.getCompletions(editor, session, pos, prefix, callback);
        }
        var state = editor.session.getState(pos.row);
        var completions = session.$mode.getCompletions(state, session, pos, prefix);
        callback(null, completions);
      }
    }]
  }
}