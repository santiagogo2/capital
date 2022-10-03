import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";

// Módulos
import { ModulosRoutingModule } from './modulos/modulos-routing.module';

// Componentes
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const appRoutes: Routes = [
	{
		path: '**',
		component: NopagefoundComponent,
	}
];

const routerOptions: ExtraOptions = {
	anchorScrolling: 'enabled',
	scrollPositionRestoration: 'enabled',
	useHash: false,
};

@NgModule({
	imports: [
		ModulosRoutingModule,
		RouterModule.forRoot( appRoutes, routerOptions ),
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}