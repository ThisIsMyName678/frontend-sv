import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  const handleClick = () => {
    const ingredientsList = ingredients
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        ingredients: ingredientsList,
        instructions,
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))
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
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-slate-700 mb-1.5">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              rows={4}
              placeholder="One ingredient per line"
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
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent resize-y"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
