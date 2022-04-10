import { filter, Subject, takeUntil } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { GameListRoutes } from '@constants/game.constants';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
	private readonly subjectDestroy$: Subject<any> = new Subject();

	routes = GameListRoutes;
	currentPath: string = '';

	constructor(private readonly router: Router) {}

	ngOnInit(): void {
		this.currentPath = this.router.url.split('?')[0].slice(1);
		this.router.events
			.pipe(takeUntil(this.subjectDestroy$))
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe({
				next: event => {
					this.currentPath = (event as NavigationEnd).url.slice(1);
				},
			});
	}

	myFunction() {
		let x = document.getElementById('myTopnav');
		if (!x) return; 
		if (x.className === 'topnav') {
			x.className += ' responsive';
		} else {
			x.className = 'topnav';
		}
	}

	ngOnDestroy(): void {
		this.subjectDestroy$.next(null);
		this.subjectDestroy$.complete();
	}
}
