import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabService } from './services/tab.service';
import { IdeComponent } from './components/ide/ide.component';
import { SidekickComponent } from './components/sidekick/sidekick.component'


@NgModule({
  declarations: [
    AppComponent,
    IdeComponent,
    SidekickComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TabService],
  bootstrap: [AppComponent]
})
export class AppModule { }
