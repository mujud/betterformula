import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class TabService {
	constructor() { 
		console.log("loading tab")
		this.betterForumlatabButton = document.getElementsByClassName("launch-better-formula")[0]
		this.advancedForumlatabButton = document.getElementsByClassName("miniTabList")[0].children[1]
		this.activeObserver = new Observable((observer) => this.subscriber(observer))
		this.advancedForumla = (document.getElementsByClassName("miniTabOn")[0] as HTMLElement)

	}
	private activeObserver: Observable<boolean>
	private isActive = false;
	private betterForumlatabButton;
	private advancedForumlatabButton;
	private advancedForumla;
	private subscriber(observer){
		this.showHide(observer,this.betterForumlatabButton,this.advancedForumlatabButton,true);
		this.showHide(observer,this.advancedForumlatabButton,this.betterForumlatabButton,false);
	}
	private showHide(observer,activeBt,inactiveBT,state){
		activeBt.addEventListener("click",(event)=>{
			event.preventDefault();
			this.isActive = state;
			activeBt.className = "currentTab";
			inactiveBT.className = "";
			this.advancedForumla.style.display = state ? "none" : "block"
			observer.next(this.isActive)
		});
	}
	public getTabActivatorObservable(): Observable<boolean>{
		return this.activeObserver
	}
}
