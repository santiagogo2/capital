import { Routes, RouterModule } from '@angular/router';

// Guards
import { NgModule } from '@angular/core';

// Componentes
import { AprobacionJuridicaComponent } from './juridica/aprobacion-juridica/aprobacion-juridica.component';
import { AprobacionPresupuestoComponent } from './presupuesto/aprobacion-presupuesto/aprobacion-presupuesto.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { NuevaSolicitudComponent } from './solicitud/nueva-solicitud/nueva-solicitud.component';
import { PanelJuridicaComponent } from './juridica/panel-juridica/panel-juridica.component';
import { PanelPresupuestoComponent } from './presupuesto/panel-presupuesto/panel-presupuesto.component';
import { PanelSolicitudesComponent } from './solicitud/panel-solicitudes/panel-solicitudes.component';
import { PrecontractualComponent } from './precontractual.component';
import { VacunacionComponent } from './vacunacion/vacunacion.component';
import { PoscontractualComponent } from './juridica/poscontractual/poscontractual.component';

const precontractualRoutes: Routes = [
	{ path: '', component: PrecontractualComponent, data: { titulo: 'Contratación Precontractual' } },
	{ path: 'panel-solicitudes', component: PanelSolicitudesComponent, data: { titulo: 'Contratación Precontractual - Panel Solicitud' } },
	{ path: 'nueva-solicitud', component: NuevaSolicitudComponent, data: { titulo: 'Contratación Precontractual - Crear' } },
	{ path: 'editar-solicitud/:id', component: EditarSolicitudComponent, data: { titulo: 'Contratación Precontractual - Editar' } },
	
	{ path: 'panel-juridica', component: PanelJuridicaComponent, data: { titulo: 'Contratación Precontractual - Panel Jurídica' } },
	{ path: 'aprobacion-juridica/:id', component: AprobacionJuridicaComponent, data: { titulo: 'Contratación Precontractual - Aprobación Jurídica' } },
	{ path: 'vacunacion', component: VacunacionComponent, data: { titulo: 'Vacunación Ministerio' } },

	{ path: 'panel-financiera', component: PanelPresupuestoComponent, data: { titulo: 'Contratación Precontractual - Panel Presupuesto'} },
	{ path: 'aprobacion-financiera/:id', component: AprobacionPresupuestoComponent, data: { titulo: 'Contratación Precontractual - Aprobación Presupuesto' } },
	{ path: 'documentacion-postcontractual/:id', component: PoscontractualComponent, data: { titulo: 'Contratación Precontractual - Documentación Postcontractual' } },
];

@NgModule({
	imports: [ RouterModule.forChild( precontractualRoutes ) ],
	exports: [ RouterModule ],
})
export class PrecontractualRoutingModule {}