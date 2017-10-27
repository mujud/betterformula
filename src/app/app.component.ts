import { Component,OnInit } from '@angular/core'
import { TabService } from './services/tab.service'
@Component({
  selector: 'app-root',
  template: `
  	hello HERE
  `
})
export class AppComponent implements OnInit  {
  title = 'app';
  constructor(private tabService: TabService){
  	console.log("started");
  }
  ngOnInit() {
    this.tabService.getTabActivatorObservable().subscribe(value => console.log(value))
  }
}
