import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
declare var $,FormulaEditor
@Injectable()
export class TabService {
	constructor() { 
		this.activeObserver = new Observable((observer) => this.subscriber(observer))
		this.calculatedFormula = $("#CalculatedFormula")[0]
	}
	private activeObserver: Observable<boolean>
	private isActive = false;
	private calculatedFormula
	private subscriber(observer){
		if(localStorage.betterFormula == "true"){
			localStorage.betterFormula = false
			this.isActive = true
			$(".miniTabList .currentTab").removeClass("currentTab")
			$(".launch-better-formula").parent().addClass("currentTab")
			observer.next(this.isActive)
		}
		$(".miniTabList a").click((event) => {
			var target = $(event.target)
			if(target.html() == "Better Formula"){
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
