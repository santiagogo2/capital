import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ModulosComponent } from './modulos.component';
import { HomeComponent } from './home/home.component';
import { ContratacionComponent } from './contratacion/contratacion.component';

const modulosRoutes: Routes = [
	{
		path: '',
		component: ModulosComponent,
		// loadChildren: () => import('./home-routing.module').then( m => m.HomeRoutingModule ),
		children: [
			{ path: 'inicio', component: HomeComponent, data: { titulo: 'Inicio' } },
			{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
			{
				path: 'contratacion',
				component: ContratacionComponent,
				data: { titulo: 'Contratación' },
				loadChildren: () => import('./contratacion/contratacion.module').then( m => m.ContratacionModule )
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild( modulosRoutes ) ],
	exports: [ RouterModule ],
})
export class ModulosRoutingModule {}