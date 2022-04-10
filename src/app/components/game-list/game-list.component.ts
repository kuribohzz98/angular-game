import { Subject, switchMap, take, takeUntil } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '@services/game.service';
import { JackpotService } from '@services/jackpots.service';

import { GameListType, JackpotType } from '@shared/types/services/game.type';

@Component({
	selector: 'app-game-list',
	templateUrl: './game-list.component.html',
	styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit, OnDestroy {
	private readonly subjectDestroy$: Subject<any> = new Subject();
	gameList: GameListType[] = [];
	defaultImg: string = 'assets/images/default.jpg';
	jackpotObj: JackpotType = {};
	isLoading: boolean = true;

	constructor(
		private readonly gameService: GameService,
		private readonly route: ActivatedRoute,
		private readonly jackpotService: JackpotService,
	) {}

	ngOnInit(): void {
		this.route.url
			.pipe(take(1))
			.pipe(
				switchMap(urlSegment => {
					const category = urlSegment[0].path;
					if (category === 'jackpots') {
						return this.jackpotService
							.getJackpotLastValue()
							.pipe(switchMap(jackpot => this.gameService.getGames(category, jackpot)));
					}
					return this.gameService.getGames(category);
				}),
			)
			.subscribe(data => {
				this.gameList = data;
				this.isLoading = false;
			});

		this.jackpotService
			.watchJackpotChange()
			.pipe(takeUntil(this.subjectDestroy$))
			.subscribe(d => (this.jackpotObj = d));
	}

	ngOnDestroy(): void {
		this.subjectDestroy$.next(null);
		this.subjectDestroy$.complete();
	}
}
