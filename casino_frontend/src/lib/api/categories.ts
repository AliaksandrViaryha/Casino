import { fetchApiData } from ".";
import { ICategory } from '../types/category'

export const getCategories = async (): Promise<ICategory[]> => {
  const data = await fetchApiData('categories')
  return data.json()
}
