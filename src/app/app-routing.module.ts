import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";

// Módulos
import { ModulosRoutingModule } from './modulos/modulos-routing.module';

// Componentes
import { LoginComponent } from "./login/login.component";
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginGuard, IdentityGuard } from './guards/guards.index';

const appRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [ LoginGuard ]
	},
	{
		path: 'logout/:sure',
		component: LoginComponent
	},
	{
		path: '**',
		component: NopagefoundComponent,
		canActivate: [ IdentityGuard ]
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