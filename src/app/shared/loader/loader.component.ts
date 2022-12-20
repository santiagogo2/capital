import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styles: []
})
export class LoaderComponent implements OnInit {
	@Input() bandera_carga: boolean = false;

	constructor() { }
	
	ngOnInit(): void {
	}
}
