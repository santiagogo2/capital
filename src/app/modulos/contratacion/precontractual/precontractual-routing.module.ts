import { Routes, RouterModule } from '@angular/router';

// Guards
import { NgModule } from '@angular/core';

// Componentes
import { AprobacionJuridicaComponent } from './juridica/aprobacion-juridica/aprobacion-juridica.component';
import { AprobacionFinancieraComponent } from './financiera/aprobacion-financiera/aprobacion-financiera.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { NuevaSolicitudComponent } from './solicitud/nueva-solicitud/nueva-solicitud.component';
import { PanelJuridicaComponent } from './juridica/panel-juridica/panel-juridica.component';
import { PanelFinancieraComponent } from './financiera/panel-financiera/panel-financiera.component';
import { PanelSolicitudesComponent } from './solicitud/panel-solicitudes/panel-solicitudes.component';
import { PrecontractualComponent } from './precontractual.component';
import { VacunacionComponent } from './vacunacion/vacunacion.component';
import { PoscontractualComponent } from './juridica/poscontractual/poscontractual.component';

// Guards
import { SolicitudesGuard, FinancieraGuard, JuridicaGuard } from './guards/precontractual-guards.index';

const precontractualRoutes: Routes = [
	{ path: '', component: PrecontractualComponent, data: { titulo: 'Contratación Precontractual' } },

	// Solicitudes
	{ path: 'panel-solicitudes', component: PanelSolicitudesComponent, data: { titulo: 'Contratación Precontractual - Panel Solicitud' }, canActivate: [SolicitudesGuard] },
	{ path: 'nueva-solicitud', component: NuevaSolicitudComponent, data: { titulo: 'Contratación Precontractual - Crear' }, canActivate: [SolicitudesGuard] },
	{ path: 'editar-solicitud/:id', component: EditarSolicitudComponent, data: { titulo: 'Contratación Precontractual - Editar' }, canActivate: [SolicitudesGuard] },
		
	// Jurídica
	{ path: 'panel-juridica', component: PanelJuridicaComponent, data: { titulo: 'Contratación Precontractual - Panel Jurídica' }, canActivate:[JuridicaGuard] },
	{ path: 'aprobacion-juridica/:id', component: AprobacionJuridicaComponent, data: { titulo: 'Contratación Precontractual - Aprobación Jurídica' }, canActivate:[JuridicaGuard] },
	{ path: 'vacunacion', component: VacunacionComponent, data: { titulo: 'Vacunación Ministerio' }, canActivate:[JuridicaGuard] },
	
	// Financiera
	{ path: 'panel-financiera', component: PanelFinancieraComponent, data: { titulo: 'Contratación Precontractual - Panel Presupuesto'}, canActivate: [FinancieraGuard] },
	{ path: 'aprobacion-financiera/:id', component: AprobacionFinancieraComponent, data: { titulo: 'Contratación Precontractual - Aprobación Presupuesto' }, canActivate: [FinancieraGuard] },
	{ path: 'documentacion-postcontractual/:id', component: PoscontractualComponent, data: { titulo: 'Contratación Precontractual - Documentación Postcontractual' }, canActivate: [FinancieraGuard] },
];

@NgModule({
	imports: [ RouterModule.forChild( precontractualRoutes ) ],
	exports: [ RouterModule ],
})
export class PrecontractualRoutingModule {}