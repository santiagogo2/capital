import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modulos
import { ContratacionRoutingModule } from './contratacion-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

// Componentes
import { ContratacionComponent } from './contratacion.component';

@NgModule({
	declarations: [
		ContratacionComponent
	],
	imports: [
		CommonModule,
		ContratacionRoutingModule,
		FormsModule,
		PipesModule
	]
})
export class ContratacionModule { }
