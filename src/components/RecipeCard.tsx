export type Recipe = {
  _id?: string
  title: string
  ingredients: string[]
  instructions: string
}

type RecipeCardProps = {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800">{recipe.title}</h3>
      </div>
      <div className="p-4 space-y-3">
        {recipe.ingredients?.length > 0 && (
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">מצרכים</p>
            <ul className="text-sm text-slate-700 list-disc list-inside space-y-0.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        )}
        {recipe.instructions && (
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">הוראות</p>
            <p className="text-sm text-slate-700 line-clamp-3">{recipe.instructions}</p>
          </div>
        )}
      </div>
    </article>
  )
}

export default RecipeCard
