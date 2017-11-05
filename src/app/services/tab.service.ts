import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
declare var $,FormulaEditor
@Injectable()

export class TabService {
	constructor() { 
		this.activeObserver = new Observable((observer) => this.subscriber(observer))
	}
	private activeObserver: Observable<boolean>
	private isActive = false
	private calculatedFormula
	private subscriber(observer){
		//local storage return a string
		//localstorage is used to allow tab switching for simple to better formula
		if(localStorage.betterFormula == "true"){
			localStorage.betterFormula = false
			this.isActive = true
			$(".miniTabList .currentTab").removeClass("currentTab")
			$(".launch-better-formula").parent().addClass("currentTab")
			observer.next(this.isActive)
		}
		
		$(".miniTabList a").click((event) => {
			var target = $(event.target)
			//TODO:Inject IDs to centralize element Identification in Chrome ext and outside of agular app
			if(target.html() == "Better Formula"){
				event.preventDefault()
				var currentTab = $(".miniTabList .currentTab a")
				if(currentTab.html() == "Simple Formula"){
					localStorage.betterFormula = true;
					FormulaEditor.switchMode('advanced')
				}else{
					currentTab.parent().removeClass("currentTab")
					target.parent().addClass("currentTab")
					this.isActive = true
					observer.next(this.isActive)
				}
			}else if(target.html() == "Advanced Formula" && this.isActive){
				var currentTab = $(".miniTabList .currentTab a")
				currentTab.parent().removeClass("currentTab")
				target.parent().addClass("currentTab")
				this.isActive = false
				observer.next(this.isActive)
			}

		})
	}
	public getTabActivatorObservable(): Observable<boolean>{
		return this.activeObserver
	}
}
