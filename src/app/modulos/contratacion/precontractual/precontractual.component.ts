import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-precontractual',
  templateUrl: './precontractual.component.html',
  styles: []
})
export class PrecontractualComponent implements OnInit {
	show: boolean;

	elementos_tarjeta: any[] = [
		{ titulo: 'Solicitudes', descripcion: 'Prueba de la descripción', enlace: 'panel-solicitudes' },
		{ titulo: 'Jurídica', descripcion: 'Prueba de la descripción', enlace: 'panel-juridica' },
		{ titulo: 'Financiera', descripcion: 'Prueba de la descripción', enlace: 'panel-financiera' },
	];

	constructor() {}
	
	ngOnInit(): void {
	}
}
