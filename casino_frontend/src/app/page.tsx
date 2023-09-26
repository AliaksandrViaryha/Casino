import CategoriesList from '@/components/CategoriesList'
import { PageTitle } from '@/components/PageTitle'
import { getCategories } from '@/lib/api/categories'

const Home = async () => {
  const categories = await getCategories()

  return (
    <div className="m-4">
      <PageTitle title="All categories" />
      <CategoriesList categories={categories} />
    </div>
  )
}

export default Home
