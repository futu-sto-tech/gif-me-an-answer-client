export enum GameStatus {
  ACTIVE,
  FINISHED,
}

export interface Game {
  code: string;
  players: Player[];
  status: GameStatus;
  totalRounds: number;
  rounds: GameRound[];
}

export enum GameRoundStatus {
  SELECT_GIF,
  PRESENT,
  VOTE,
  FINSIHED,
}

export interface GameRound {
  order: number;
  status: GameRoundStatus;
  caption: string;
  presentImage: string;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
  playerId: string;
  votes: number;
}

export enum PlayerStatus {
  JOINED,
  READY,
}

export interface Player {
  id: string;
  status: PlayerStatus;
  name: string;
  points: number;
}

export interface GifImage {
  url: string;
  width: string;
  heihgt: string;
}
export interface GifFixedWidth {
  url: string;
  webp: string;
}

export interface Gif {
  id: string;
  title: string;
  preview: GifImage;
  original: GifImage;
  fixedWidth: GifFixedWidth;
}
