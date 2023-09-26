'use client'

import { ICategory } from '@/lib/types/category'
import { CategoryCard } from '@/components/CategoryCard'

export interface ICategoriesListProps {
  categories: ICategory[]
}

export default function CategoriesList({
  categories,
}: ICategoriesListProps) {
  return (
    <div className="gap-4 grid items-center justify-items-center">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          title={category.title}
          gamesCount={category.gamesCount}
        ></CategoryCard>
      ))}
    </div>
  )
}
