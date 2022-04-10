export type GameListType = {
	categories: string[];
	name: string;
	image: string;
	id: string;
};

export type JackpotListType = {
	game: string;
	amount: number;
};

export type JackpotType = { [x: string]: number };
