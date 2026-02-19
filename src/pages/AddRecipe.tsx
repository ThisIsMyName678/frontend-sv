import { useState } from 'react'

const AddRecipe = () => {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const parseIngredients = (str: string): string[] => {
    return str
      .split(/[\n,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean)
  }

  const validateForm = (): { valid: true } | { valid: false; message: string } => {
    const trimmedTitle = title.trim()
    if (trimmedTitle.length === 0) {
      return { valid: false, message: 'שם המתכון חובה – יש להזין לפחות תו אחד.' }
    }
    if (trimmedTitle.length > 15) {
      return { valid: false, message: 'שם המתכון – מקסימום 15 תווים.' }
    }
    const ingredientsList = parseIngredients(ingredients)
    if (ingredientsList.length === 0) {
      return { valid: false, message: 'מצרכים – יש להזין לפחות מצרך אחד (ניתן להפריד ברווחים, פסיקים או שורות).' }
    }
    if (instructions.length > 200) {
      return { valid: false, message: 'תיאור המתכון – מקסימום 200 תווים.' }
    }
    return { valid: true }
  }

  const handleSubmit = () => {
    setErrorMessage('')
    setShowSuccess(false)
    const validation = validateForm()
    if (!validation.valid) {
      setErrorMessage(validation.message)
      return
    }
    const ingredientsList = parseIngredients(ingredients)
    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        ingredients: ingredientsList,
        instructions,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setErrorMessage('')
        setShowSuccess(true)
      })
      .catch((error) => console.error('Error:', error))
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 text-white px-6 py-4">
          <h1 className="text-xl font-semibold tracking-tight">New Recipe</h1>
          <p className="text-slate-300 text-sm mt-0.5">Add your recipe details</p>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1.5">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Recipe name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={15}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            />
            <p className="text-xs text-slate-500 mt-1">{title.length}/15</p>
          </div>
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-slate-700 mb-1.5">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              rows={4}
              placeholder="Milk, Eggs, Water או Milk Eggs Water"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent resize-y"
            />
          </div>
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-slate-700 mb-1.5">
              Instructions
            </label>
            <textarea
              id="instructions"
              rows={5}
              placeholder="Step-by-step instructions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              maxLength={200}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent resize-y"
            />
            <p className="text-xs text-slate-500 mt-1">{instructions.length}/200</p>
          </div>
          {errorMessage && (
            <div className="rounded-lg bg-red-100 border border-red-300 text-red-800 px-4 py-3 text-sm font-medium">
              {errorMessage}
            </div>
          )}
          {showSuccess && (
            <div className="rounded-lg bg-green-100 border border-green-300 text-green-800 px-4 py-3 text-sm font-medium">
              the recipe has been added successfully
            </div>
          )}
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRecipe
