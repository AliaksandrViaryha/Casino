import { Card, CardFooter, Image, Button } from '@nextui-org/react'

import { IGame } from '@/lib/types/game'

export interface IGameCardProps extends Omit<IGame, 'category_id'> {}

export const GameCard = ({
  id,
  title,
  url
}: IGameCardProps) => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none max-w-[400px]"
    >
      <Image
        alt={title}
        height={100}
        src={url}
        width={200}
        style={{
          objectFit: 'cover'
        }}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-black/80">{title}</p>
        <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
          Play now
        </Button>
      </CardFooter>
    </Card>
  )
}
