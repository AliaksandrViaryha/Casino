import { GamesList } from '@/components/GamesList'
import { PageTitle } from '@/components/PageTitle'
import { getGamesByCategoryId } from '@/lib/api/games'

const Category = async ({ params }: { params: { id: number } }) => {
  // To load the first time for the search bots
  const categoryGames = await getGamesByCategoryId(params.id, 0)

  return (
    <div className="m-4">
      <PageTitle title={categoryGames.title} link={{ title: 'Categories list', href: '/' }} />
      <GamesList games={categoryGames.games} gamesCount={categoryGames.gamesCount} />
    </div>
  )
}

export default Category
