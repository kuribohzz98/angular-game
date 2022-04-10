import { concatMap, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

import { GameListType, JackpotListType, JackpotType } from '@shared/types/services/game.type';

@Injectable({ providedIn: 'root' })
export class GameService {
	constructor(private readonly http: HttpClient) {}

	getGames(type?: string, jackpotObj?: JackpotType) {
		let types: string | string[] | undefined = type;
		if (types === 'other') {
			types = ['ball', 'virtual', 'fun'];
		}
		const execGet = this.http.get<GameListType[]>(environment.apiHost + '/front-end-test/games.php');
		return execGet.pipe(
			map(data => {
				if (!types) return data;
				if (types === 'jackpots') {
					return data.filter(d => jackpotObj?.[d.id]);
				}
				if (typeof types === 'string') {
					return data.filter(d => d.categories.includes(types as string));
				}
				return data.filter(d => d.categories.some(c => (types as string[]).includes(c)));
			}),
		);
	}

	getJackpots() {
		return this.http.get<JackpotListType[]>(environment.apiHost + '/front-end-test/jackpots.php').pipe(
			map(data => {
				const dataObj = {} as JackpotType;
				for (const iterator of data) {
					dataObj[iterator.game] = iterator.amount;
				}
				return dataObj;
			}),
		);
	}
}
