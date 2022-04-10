import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameListRoutes } from '@constants/game.constants';

import { GameListComponent } from '@components/game-list/game-list.component';

const routes: Routes = GameListRoutes.map(c => ({ path: c.path, component: GameListComponent }));

@NgModule({
	imports: [
		RouterModule.forChild([
			...routes,
			{
				path: '**',
				redirectTo: '/top',
				pathMatch: 'full',
			},
		]),
	],
	exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
