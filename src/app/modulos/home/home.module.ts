import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { HomeRoutingModule } from './home-routing.module';

// Componentes
import { HomeComponent } from './home.component';

@NgModule({
	declarations: [
		HomeComponent,
	],
	exports: [
		HomeComponent
	],
	imports: [
		CommonModule,
		HomeRoutingModule,
	]
})
export class HomeModule { }
