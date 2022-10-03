import { Component, Input, OnInit } from '@angular/core';

interface Card {
	titulo: string;
	descripcion: string;
	enlace: string;
}

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
	@Input() elementos_tarjeta: Card[];

	constructor() { }

	ngOnInit(): void {
	}
}
