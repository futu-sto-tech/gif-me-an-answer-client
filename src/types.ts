export enum PlayerStatus {
  JOINED,
  READY,
}

export interface Player {
  id: number;
  status: PlayerStatus;
  name: string;
  points: number;
}

export interface Image {
  id: number;
  url: string;
  player_id: number;
  votes: number;
}

export enum GameRoundStatus {
  SELECT_GIF,
  PRESENT,
  VOTE,
  FINISHED,
}

export interface GameRound {
  order: number;
  status: GameRoundStatus;
  caption: string;
  presented_image: Image;
  images: Image[];
}

export enum GameStatus {
  ACTIVE,
  FINISHED,
}

export interface Game {
  code: string;
  players: Player[];
  status: GameStatus;
  total_rounds: number;
  rounds: GameRound[];
}
