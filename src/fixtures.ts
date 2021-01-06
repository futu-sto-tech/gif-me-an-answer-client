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

const BASE_PLAYER: Player = {
  id: 'player1',
  name: 'Robin',
  points: 0,
  status: PlayerStatus.JOINED,
};

const PLAYER_ONE: Player = { ...BASE_PLAYER };
const PLAYER_TWO: Player = { ...BASE_PLAYER, id: 'player2', name: 'Jens' };

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

const PLAYER_ONE_IMAGE: Image = {
  id: 'image1',
  url: 'https://media.giphy.com/media/lXiRKBj0SAA0EWvbG/giphy.gif',
  playerId: PLAYER_ONE.id,
  votes: 0,
};

const PLAYER_TWO_IMAGE: Image = {
  id: 'image2',
  playerId: PLAYER_TWO.id,
  url: 'https://media.giphy.com/media/xwoZyKqaoVbxeZX2uM/giphy.gif',
  votes: 0,
};

export const GAME_NOT_STARTED = null;

export const GAME_STARTED: Game = BASE_GAME;

export const GAME_JOINED: Game = {
  ...BASE_GAME,
  players: [PLAYER_ONE, PLAYER_TWO],
};

export const GAME_ROUND_ONE: Game = {
  ...GAME_JOINED,
  players: GAME_JOINED.players.map((item) => ({ ...item, status: PlayerStatus.READY })),
  rounds: [{ ...GAME_JOINED.rounds[0], status: GameRoundStatus.SELECT_GIF }, ...GAME_JOINED.rounds.slice(1)],
};

export const GAME_ROUND_SELECTED: Game = {
  ...GAME_ROUND_ONE,
  rounds: [
    { ...GAME_ROUND_ONE.rounds[0], images: [PLAYER_ONE_IMAGE, PLAYER_TWO_IMAGE] },
    ...GAME_JOINED.rounds.slice(1),
  ],
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

export const GAME_ROUND_VOTE: Game = {
  ...GAME_ROUND_PRESENT,
  rounds: GAME_ROUND_PRESENT.rounds.map((item) =>
    item.order === 0
      ? {
          ...GAME_ROUND_PRESENT.rounds[0],
          status: GameRoundStatus.VOTE,
        }
      : item,
  ),
};

export const GAME_ROUND_RESULTS: Game = {
  ...GAME_ROUND_VOTE,
  rounds: GAME_ROUND_VOTE.rounds.map((item) =>
    item.order === 0
      ? {
          ...GAME_ROUND_VOTE.rounds[0],
          status: GameRoundStatus.FINISHED,
          images: GAME_ROUND_VOTE.rounds[0].images.map((item) => ({ ...item, votes: randomIntFromInterval(0, 8) })),
        }
      : item,
  ),
};

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
