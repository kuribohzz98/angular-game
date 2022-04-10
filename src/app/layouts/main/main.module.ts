import { LazyLoadImageModule } from 'ng-lazyload-image';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingModule } from '@components/common/loading/loading.module';
import { GameListComponent } from '@components/game-list/game-list.component';
import { NavbarModule } from '@components/navbar/navbar.module';

import { MainLayoutRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
	imports: [CommonModule, MainLayoutRoutingModule, LazyLoadImageModule, NavbarModule, LoadingModule],
	declarations: [MainComponent, GameListComponent],
})
export class MainModule {}
