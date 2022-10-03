import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ModulosComponent } from './modulos.component';

const modulosRoutes: Routes = [
	{
		path: '',
		component: ModulosComponent,
		loadChildren: () => import('./home/home.module').then( m => m.HomeModule )
	},
	{
		path: 'contratacion',
		component: ModulosComponent,
		data: { titulo: 'Contratación' },
		loadChildren: () => import('./contratacion/contratacion.module').then( m => m.ContratacionModule )
	}
];

@NgModule({
	imports: [ RouterModule.forChild( modulosRoutes ) ],
	exports: [ RouterModule ],
})
export class ModulosRoutingModule {}