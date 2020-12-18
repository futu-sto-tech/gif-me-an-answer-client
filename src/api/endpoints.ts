import { Gif } from './../types';
import { Game, Player } from 'types';
import { apiFetcher } from './client';

/**
 * @summary Find a game by given code
 * @description Returns a single game
 * @param code Game code to look for
 * @returns The game object
 */
export async function findGames(code: number): Promise<[Game]> {
  return await apiFetcher({
    url: `/games/${code}`,
  });
}

/**
 * @summary Create a new game
 * @param rounds Number of rounds to be played
 * @returns A game object
 */
export async function createGame(rounds: number): Promise<Game> {
  return await apiFetcher({
    url: '/games',
    method: 'POST',
    data: {
      rounds: rounds,
    },
  });
}

/**
 * @summary Add player to a game
 * @param code
 * @param playerName
 * @returns Player object
 */
export async function joinGame(code: number, playerName: string): Promise<Player> {
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
export async function markReadyForGame(code: number, player: Player): Promise<Game> {
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
export async function markReadyForNextRound(code: number, order: number, player: Player): Promise<Game> {
  return await apiFetcher({
    url: `/games/${code}/rounds/${order}/done`,
    method: 'POST',
    data: {
      player: player.id,
    },
  });
}

/**
 * @summary Submit a GIF to a round
 * @param code Game code
 * @param order Game round order
 * @param player Player details
 * @param gifUrl Image url
 * @returns Current game
 */
export async function submitGif(code: number, order: string, player: Player, gifUrl: string): Promise<Game> {
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
export async function vote(code: number, order: string, player: Player, image: number): Promise<Game> {
  return await apiFetcher({
    url: `/games/${code}/rounds/${order}/vote`,
    data: {
      player: player.id,
      image: image,
    },
  });
}

export async function getGifs(): Promise<[Gif]> {
  return await apiFetcher({
    url: `/gifs`,
    method: 'POST',
  });
}

export async function searchGifs(query: string): Promise<[Gif]> {
  return await apiFetcher({
    url: `/search/${query}`,
    method: 'POST',
  });
}
