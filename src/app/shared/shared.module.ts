import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Componentes
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
	imports: [
		RouterModule,
		CommonModule,
	],
	declarations: [
		BreadcrumbsComponent,
		FooterComponent,
		HeaderComponent,
		NopagefoundComponent,
		SidebarComponent,
	],
	exports: [
		BreadcrumbsComponent,
		FooterComponent,
		HeaderComponent,
		NopagefoundComponent,
		SidebarComponent,
	]
})

export class SharedModule {}