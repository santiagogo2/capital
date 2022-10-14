import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { IdentityGuard } from '../guards/guards.index';
import { ContratacionGuard } from './guards/modulos-guards.index';

// Componentes
import { ModulosComponent } from './modulos.component';

// Guards

const modulosRoutes: Routes = [
	{
		path: '',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./home/home.module').then( m => m.HomeModule )
	},
	{
		path: 'contratacion',
		component: ModulosComponent,
		canActivate: [ IdentityGuard, ContratacionGuard ],
		data: { titulo: 'Contratación' },
		loadChildren: () => import('./contratacion/contratacion.module').then( m => m.ContratacionModule )
	}
];

@NgModule({
	imports: [ RouterModule.forChild( modulosRoutes ) ],
	exports: [ RouterModule ],
})
export class ModulosRoutingModule {}