import { Game, Player } from 'types';

import { Gif } from './../types';
import { apiFetcher } from './client';

/**
 * @summary Find a game by given code
 * @description Returns a single game
 * @param code Game code to look for
 * @returns The game object
 */
export async function findGame(code: string): Promise<Game | null> {
  try {
    return await apiFetcher({ url: `/games/${code}` });
  } catch {
    console.log('Game not found', code);
    return null;
  }
}

/**
 * @summary Create a new game
 * @param rounds Number of rounds to be played
 * @param players Number of players
 * @returns A game object
 */
export async function createGame({ rounds, players }: { rounds: number; players: number }): Promise<Game> {
  return await apiFetcher({
    url: '/games',
    method: 'POST',
    data: {
      rounds,
      players,
    },
  });
}

/**
 * @summary Add player to a game
 * @param code
 * @param playerName
 * @returns Player object
 */
export async function joinGame(code: string, playerName: string): Promise<Player> {
  return await apiFetcher({
    url: `/games/${code}/join`,
    method: 'POST',
    data: {
      name: playerName,
    },
  });
}

/**
 * @summary Announce that a player is ready to start game
 * @param player Player details
 * @returns The game object player is ready for
 */
export async function markReadyForGame(code: string, player: Player): Promise<Game> {
  return await apiFetcher({
    url: `/games/${code}/ready`,
    method: 'POST',
    data: {
      player: player.id,
    },
  });
}

/**
 * @summary Announce that a player is ready for next round
 * @param code Game code
 * @param order Game round order
 * @param player Player details
 * @returns Current game
 */
export async function markReadyForNextRound(code: string, order: number, player: Player): Promise<Game> {
  return await apiFetcher({
    url: `/games/${code}/rounds/${order}/done`,
    method: 'POST',
    data: {
      player: player.id,
    },
  });
}

interface SubmitGifParams {
  code: string;
  order: number;
  player: Player;
  gifUrl: string;
}

/**
 * @summary Submit a GIF to a round
 * @param params
 * @param params.code Game code
 * @param params.order Game round order
 * @param params.player Player details
 * @param params.gifUrl Image url
 * @returns Current game
 */
export async function submitGif({ code, order, player, gifUrl }: SubmitGifParams): Promise<Game> {
  return await apiFetcher({
    url: `/games/${code}/rounds/${order}/images`,
    method: 'POST',
    data: {
      player: player.id,
      url: gifUrl,
    },
  });
}

/**
 * @summary Vote for an image
 * @param code Game code
 * @param order Game round order
 * @param player Player details
 * @param image Voted image
 * @returns Current game
 */
export async function vote(code: string, order: number, player: Player, image: string): Promise<Game> {
  return await apiFetcher({
    url: `/games/${code}/rounds/${order}/vote`,
    method: 'POST',
    data: {
      player: player.id,
      image: image,
    },
  });
}

export async function searchGifs(query: string): Promise<[Gif]> {
  return await apiFetcher({
    url: `/gifs/search/`,
    method: 'POST',
    data: {
      query: query,
    },
  });
}
