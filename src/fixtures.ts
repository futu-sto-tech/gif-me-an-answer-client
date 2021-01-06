import { Game, GameRound, GameRoundStatus, GameStatus, Image, Player, PlayerStatus } from 'types';

export const DUMMY_PLAYER_DATA: Player = { id: 'player1', name: 'Hi', points: 22, status: PlayerStatus.READY };

export const DUMMY_GAME_DATA: Game = {
  code: '7856',
  players: [DUMMY_PLAYER_DATA, { id: 'player2', name: 'John', points: 2, status: PlayerStatus.JOINED }],
  status: GameStatus.ACTIVE,
  totalRounds: 8,
  rounds: [
    {
      order: 1,
      status: GameRoundStatus.FINISHED,
      caption: 'Hello jebuz',
      presentImage: '',
      images: [],
    },
  ],
};

export const BASE_PLAYER: Player = {
  id: 'player1',
  name: 'Robin',
  points: 0,
  status: PlayerStatus.JOINED,
};

const BASE_ROUND: GameRound = {
  order: 0,
  status: GameRoundStatus.NOT_STARTED,
  caption: "What a day I've had...",
  presentImage: '',
  images: [],
};

const BASE_GAME: Game = {
  code: '7856',
  players: [],
  status: GameStatus.ACTIVE,
  totalRounds: 3,
  rounds: [BASE_ROUND, { ...BASE_ROUND, order: 1 }, { ...BASE_ROUND, order: 2 }],
};

const BASE_IMAGE: Image = {
  id: 'image1',
  url: 'https://media.giphy.com/media/lXiRKBj0SAA0EWvbG/giphy.gif',
  playerId: BASE_PLAYER.id,
  votes: 0,
};

export const GAME_NOT_STARTED = null;

export const GAME_STARTED: Game = BASE_GAME;

export const GAME_JOINED: Game = {
  ...BASE_GAME,
  players: [BASE_PLAYER],
};

export const GAME_ROUND_ONE: Game = {
  ...GAME_JOINED,
  rounds: [{ ...GAME_JOINED.rounds[0], status: GameRoundStatus.SELECT_GIF }, ...GAME_JOINED.rounds.slice(1)],
};

export const GAME_ROUND_SELECTED: Game = {
  ...GAME_ROUND_ONE,
  rounds: [{ ...GAME_ROUND_ONE.rounds[0], images: [BASE_IMAGE] }, ...GAME_JOINED.rounds.slice(1)],
};

export const GAME_ROUND_PRESENT: Game = {
  ...GAME_ROUND_SELECTED,
  rounds: [
    {
      ...GAME_ROUND_SELECTED.rounds[0],
      status: GameRoundStatus.PRESENT,
      presentImage: GAME_ROUND_SELECTED.rounds[0].images[0].url,
    },
    ...GAME_ROUND_SELECTED.rounds.slice(1),
  ],
};
