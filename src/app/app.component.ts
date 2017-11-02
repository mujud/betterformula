import { Component,OnInit } from '@angular/core'
import { TabService } from './services/tab.service'
declare var fieldTreeController,FormulaEditor
@Component({
  selector: 'app-root',
  template: `
  	<app-ide *ngIf="activate"></app-ide>
  `
})
export class AppComponent implements OnInit  {
  title = 'app';
  activate: boolean = false;
  constructor(private tabService: TabService){
  	console.log("started");
  }
  ngOnInit() {
    this.tabService.getTabActivatorObservable().subscribe(value => typeof fieldTreeController == "undefined" ? FormulaEditor.switchMode('advanced') : this.activate = value)
  }
}
