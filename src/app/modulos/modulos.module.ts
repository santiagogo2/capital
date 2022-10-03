import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modulos
import { ModulosRoutingModule } from './modulos-routing.module';
import { SharedModule } from '../shared/shared.module';

// Componentes
import { ModulosComponent } from './modulos.component';

@NgModule({
	declarations: [
		ModulosComponent,
	],
	exports: [
		ModulosComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		ModulosRoutingModule,
	]
})
export class ModulosModule { }
