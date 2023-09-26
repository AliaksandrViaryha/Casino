'use client'

import { ICategory } from '@/lib/types/category'
import { Card, CardHeader, CardFooter, Divider, Link } from '@nextui-org/react'

export interface ICategoryCardProps extends ICategory {}

export const CategoryCard = ({
  id,
  title,
  gamesCount
}: ICategoryCardProps) => {
  return (
    <Card className="max-w-[800px] w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md font-bold">{title} <span className="text-small text-default-500">({gamesCount})</span></p>
        </div>
      </CardHeader>
      <Divider/>
      <CardFooter>
        <Link
          showAnchorIcon
          href={`/category/${id}`}
        >
          See games
        </Link>
      </CardFooter>
    </Card>
  )
}
