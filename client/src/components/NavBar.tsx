export function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a className="text-white hover:text-gray-400">Create Recipe</a>
          </li>
          <li>
            <a className="text-white hover:text-gray-400">Meal Planner</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
