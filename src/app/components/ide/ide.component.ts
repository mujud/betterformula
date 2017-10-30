import { Component, OnInit } from '@angular/core';
declare var ace: any;
@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
	ace.require("ace/ext/language_tools");
    var editor = ace.edit("bt-frmla");
    editor.setTheme("ace/theme/idle_fingers");
    editor.session.setMode("ace/mode/betterformula");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });
  }

}
""