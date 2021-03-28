export enum GameStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export interface Game {
  code: string;
  players: Player[];
  status: GameStatus;
  totalRounds: number;
  totalPlayers: number;
  currentRound: number;
  rounds: GameRound[];
}

export enum GameRoundStatus {
  NOT_STARTED = 'NOT_STARTED',
  SELECT_GIF = 'SELECT_GIF',
  PRESENT = 'PRESENT',
  VOTE = 'VOTE',
  FINISHED = 'FINISHED',
}

export interface GameRound {
  order: number; // 1-indexed
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

export interface RoundScreenProps {
  game: Game;
  round: GameRound;
  player: Player;
}
