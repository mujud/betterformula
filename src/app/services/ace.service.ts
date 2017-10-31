import { Injectable } from '@angular/core';
import { HighlightRules } from '../classes/highlight-rules';

@Injectable()
export class AceService {

  constructor() {
  	var oop = ace.require("ace/lib/oop");
  	var TextHighlightRules = ace.require("ace/mode/text_highlight_rules").TextHighlightRules;
  	oop.inherits(HighlightRules, TextHighlightRules);

  }
  public init(){
  	var editor = ace.edit("bt-frmla");
	editor.setTheme("ace/theme/idle_fingers");    
    var TextMode = ace.require("ace/mode/text").Mode;
    var dynamicMode = new TextMode();
    dynamicMode.HighlightRules = HighlightRules;
    editor.session.setMode(dynamicMode);
    console.log(editor)
    console.log(dynamicMode)
  }
}
// dynamicMode.$highlightRules.setKeywords(JSON.parse('{"keyword": "first|items|editor"}'))
// editor.session.bgTokenizer.start(0)