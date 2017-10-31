import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabService } from './services/tab.service';
import { IdeComponent } from './components/ide/ide.component';
import { SidekickComponent } from './components/sidekick/sidekick.component'
import { AceService } from './services/ace.service'


@NgModule({
  declarations: [
    AppComponent,
    IdeComponent,
    SidekickComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TabService,AceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
