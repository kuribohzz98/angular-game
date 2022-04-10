import { BehaviorSubject, concatMap, interval, map, merge, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { JackpotType } from '@shared/types/services/game.type';

import { GameService } from './game.service';

@Injectable({ providedIn: 'root' })
export class JackpotService {
	private readonly jackpotStore$: BehaviorSubject<JackpotType> = new BehaviorSubject<JackpotType>({});

	constructor(private readonly gameService: GameService) {
		this.onInit();
	}

	onInit(): void {
		merge(this.gameService.getJackpots(), interval(10000))
			.pipe(concatMap(() => this.gameService.getJackpots()))
			.subscribe({ next: data => this.jackpotStore$.next(data) });
	}

	watchJackpotChange() {
		return this.jackpotStore$.asObservable();
	}

	getJackpotLastValue() {
		if (!Object.keys(this.jackpotStore$.getValue()).length) {
			return this.gameService.getJackpots().pipe(
				map(data => {
					this.jackpotStore$.next(data);
					return this.jackpotStore$.getValue();
				}),
			);
		}
		return of(this.jackpotStore$.getValue());
	}
}
