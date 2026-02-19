import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-slate-200 text-slate-900'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Recipes</h2>
      </div>
      <nav className="p-3 flex-1 space-y-1">
        <NavLink to="/recipes" className={linkClass} end>
          All recipes
        </NavLink>
        <NavLink to="/add-recipe" className={linkClass}>
          Add new recipe
        </NavLink>
        <NavLink to="/search" className={linkClass}>
          Search recipe
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
