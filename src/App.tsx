import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddRecipe from './pages/AddRecipe'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
