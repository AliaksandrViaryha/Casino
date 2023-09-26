'use client'

import { useCallback, useState } from 'react' 
import { useParams } from 'next/navigation'
import { Button } from '@nextui-org/react'

import { IGame } from '@/lib/types/game'
import { GameCard } from '../GameCard'
import { getGamesByCategoryId } from '@/lib/api/games'

export interface IGamesListProps {
  games: IGame[]
  gamesCount: number
}

export const GamesList = ({
  games,
  gamesCount
}: IGamesListProps) => {
  const params = useParams()
  const categoryId = params.id as string

  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [gamesList, setGamesList] = useState(games)

  console.log(gamesCount, gamesList.length, gamesCount === gamesList.length)

  const onLoadMore = useCallback(() => {
    (async () => {
      setIsLoading(true)
      setCurrentPage((prevValue) => prevValue + 1)

      let newGamesList: IGame[] = [];

      try {
        const moreGames = await getGamesByCategoryId(parseInt(categoryId, 10), currentPage + 1)

        newGamesList = [...gamesList, ...moreGames.games];

        setGamesList([...newGamesList])
      } catch (err) {
        // TODO Show error message!
      } finally {  
        setIsLoading(false)
      }
    })();
  }, [])

  return (
    <div>
      <div className="gap-2 grid items-center justify-items-center grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
        {gamesList.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            url={game.url}
          ></GameCard>
        ))}
      </div>

      <div className="flex justify-center items-center my-4">
        <Button
          color={gamesList.length === gamesCount ? 'default' : 'primary'}
          onClick={onLoadMore}
          isLoading={isLoading}
          disabled={isLoading || (gamesList.length === gamesCount)}
        >
          Load more
        </Button>
      </div>
    </div>
  )
}
