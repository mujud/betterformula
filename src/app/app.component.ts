import { Component,OnInit } from '@angular/core'
import { TabService } from './services/tab.service'
declare var fieldTreeController,FormulaEditor,$
@Component({
  selector: 'app-root',
  template: `
  	<app-ide *ngIf="activate"></app-ide>
  `
})
export class AppComponent implements OnInit  {
  private activate: boolean = false;
  private calculatedFormula
  constructor(private tabService: TabService){
    this.calculatedFormula = $("#CalculatedFormula")[0]
  }
  ngOnInit() {
    this.tabService.getTabActivatorObservable().subscribe(value => this.handleTabChange(value))
  }
  private handleTabChange(value){
    this.activate = value
    if(value)
      $("#CalculatedFormula").hide()
    else
      $("#CalculatedFormula").show()
  }
}
