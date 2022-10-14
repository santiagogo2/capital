import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Modulos
import { PrecontractualRoutingModule } from './precontractual-routing.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { SharedModule } from '../../../shared/shared.module';

// Componentes
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { NuevaSolicitudComponent } from './solicitud/nueva-solicitud/nueva-solicitud.component';
import { PanelSolicitudesComponent } from './solicitud/panel-solicitudes/panel-solicitudes.component';
import { PrecontractualComponent } from './precontractual.component';
import { VacunacionComponent } from './vacunacion/vacunacion.component';
import { AprobacionJuridicaComponent } from './juridica/aprobacion-juridica/aprobacion-juridica.component';
import { PanelJuridicaComponent } from './juridica/panel-juridica/panel-juridica.component';
import { AgregarDocumentosComponent } from './documentos/agregar-documentos/agregar-documentos.component';
import { PanelFinancieraComponent } from './financiera/panel-financiera/panel-financiera.component';
import { AprobacionFinancieraComponent } from './financiera/aprobacion-financiera/aprobacion-financiera.component';
import { PoscontractualComponent } from './juridica/poscontractual/poscontractual.component';

@NgModule({
	declarations: [
		EditarSolicitudComponent,
		NuevaSolicitudComponent,
		PanelSolicitudesComponent,
		PrecontractualComponent,
		VacunacionComponent,
		AprobacionJuridicaComponent,
		PanelJuridicaComponent,
		AgregarDocumentosComponent,
		PanelFinancieraComponent,
		AprobacionFinancieraComponent,
		PoscontractualComponent,
	],
	imports: [
		CommonModule,
		NgxPaginationModule,
		PrecontractualRoutingModule,
		FormsModule,
		PipesModule,
		SharedModule,
	]
})
export class PrecontractualModule { }
