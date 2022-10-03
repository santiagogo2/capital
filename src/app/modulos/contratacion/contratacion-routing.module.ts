import { Routes, RouterModule } from '@angular/router';

// Guards
import { NgModule } from '@angular/core';

// Componentes
import { ContratacionComponent } from './contratacion.component';

const contratacionRoutes: Routes = [
	{
		path: '',
		component: ContratacionComponent,
		data: { titulo: 'Contratación' },
		children: [
			{ 
				path: 'precontractual',
				loadChildren: () => import('./precontractual/precontractual.module').then( m => m.PrecontractualModule ),
			}
		]
	},
];

@NgModule({
	imports: [ RouterModule.forChild( contratacionRoutes ) ],
	exports: [ RouterModule ],
})
export class ContratacionRoutingModule {}