import { useEffect, useState } from 'react'
import RecipeCard, { type Recipe } from '../components/RecipeCard'

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-slate-800">All recipes</h1>
      <p className="text-slate-600 mt-2">Recipe list will go here.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id ?? recipe.title} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default Recipes
