import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isResultsPage = location.pathname === '/results';

  return (
    <div className="container mx-auto px-4 rounded-b-lg">
      <nav className={`p-4 px-8 ${isResultsPage ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-white text-black'} rounded-b-lg flex justify-end shadow-md`}>
        <h1 className="text-2xl font-bold">TrendGraphs</h1>
      </nav>
    </div>
  )
};

export default Navbar;