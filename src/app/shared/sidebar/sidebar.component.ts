import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	constructor() { }
	
	ngOnInit(): void {
		let logo_content = document.querySelector("#logo_content");
		let sidebar = document.querySelector('.sidebar');
		let page_wrapper = document.querySelector('#page_wrapper');
		let topbar = document.querySelector("#topbar");

		logo_content.addEventListener('click', () => {
			sidebar.classList.toggle('active');
			page_wrapper.classList.toggle('active');
			topbar.classList.toggle('active');
		});
	}
}
