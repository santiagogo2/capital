import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-modulos',
	templateUrl: './modulos.component.html',
	styles: []
})
export class ModulosComponent implements OnInit {

	constructor() { }
	
	ngOnInit(): void {
		let window_height = window.innerHeight;		
		let page_wrapper = document.querySelector('#page_wrapper');

		page_wrapper.setAttribute('style', `min-height: ${window_height}px`);
	}
}
