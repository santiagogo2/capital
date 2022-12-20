import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Componentes
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardComponent } from './card/card.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
	imports: [
		RouterModule,
		CommonModule,
	],
	declarations: [
		BreadcrumbsComponent,
		CardComponent,
		FooterComponent,
		HeaderComponent,
		LoaderComponent,
		NopagefoundComponent,
		SidebarComponent,
	],
	exports: [
		BreadcrumbsComponent,
		CardComponent,
		FooterComponent,
		HeaderComponent,
		LoaderComponent,
		NopagefoundComponent,
		SidebarComponent,
	]
})

export class SharedModule {}