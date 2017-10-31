import { Component, OnInit } from '@angular/core';
import { AceService } from '../../services/ace.service'

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {
  constructor(private aceservice: AceService) { }
  formulaText: HTMLInputElement
  ngOnInit() {
    this.aceservice.init()
    /*this.formulaText = document.getElementsByClassName('FormulaText')[0] as HTMLInputElement
  	ace.require("ace/ext/language_tools");
    var editor = ace.edit("bt-frmla");
    editor.setTheme("ace/theme/idle_fingers");
    editor.session.setMode("ace/mode/betterformula");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });
    editor.setValue(this.formulaText.value,1)
    var sObject = fieldTreeController.tree.rootList[0].labelName
    var fields = fieldTreeController.tree.rootList[0].children
    console.log(sObject)
    console.log(fields)
    for (let field of fields) {
        console.log(field.key+"--->"+field.attributes.type); // 1, "string", false
    }*/
  }


}
