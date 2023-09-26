import { ICategory } from '@/lib/types/category'
import { IGame } from '@/lib/types/game'
import { fetchApiData } from '.'

export const GAMES_DEFAULT_CHUNK_SIZE = 12

export interface ICategoryGames extends ICategory {
  games: IGame[]
}

export const getGamesByCategoryId = async (
  id: ICategory['id'],
  page: number,
  chunkSize: number = GAMES_DEFAULT_CHUNK_SIZE
): Promise<ICategoryGames> => {
  const data = await fetchApiData(`categories/${id}?limit=${chunkSize}&offset=${page}`)
  return data.json()
}
