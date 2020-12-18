import { Module } from 'module';
import { apiFetcher } from './client';

export async function getGames() {
  const data = await apiFetcher({ url: '/games/{code}' });
  return data;
}
