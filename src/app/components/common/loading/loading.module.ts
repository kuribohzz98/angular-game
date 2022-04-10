import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerLoadingModule } from '../spinner-loading/spinner-loading.module';
import { LoadingComponent } from './loading.component';

@NgModule({
	imports: [CommonModule, SpinnerLoadingModule],
	declarations: [LoadingComponent],
	exports: [LoadingComponent],
})
export class LoadingModule {}
