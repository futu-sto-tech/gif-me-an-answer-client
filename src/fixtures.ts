import { Game, GameStatus, Player, PlayerStatus } from 'types';

export const DUMMY_PLAYER_DATA: Player = { id: 'player1', name: 'Hi', points: 22, status: PlayerStatus.READY };

export const DUMMY_GAME_DATA: Game = {
  code: '7856',
  players: [DUMMY_PLAYER_DATA, { id: 'player2', name: 'John', points: 2, status: PlayerStatus.JOINED }],
  status: GameStatus.ACTIVE,
  totalRounds: 8,
  rounds: [],
};
