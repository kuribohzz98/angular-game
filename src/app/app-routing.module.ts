import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './layouts/main/main.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		loadChildren: () => import('./layouts/main/main.module').then(m => m.MainModule),
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
