import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <div className="flex items-center gap-2 text-base text-gray-700 mb-4">
      <nav className="flex items-center gap-2 text-base font-normal text-gray-700 mb-2">
        <Link to="/" className="flex items-center hover:text-orange-500 transition-colors duration-200">
          <Home className="h-4 w-4 mr-1" />
          Home
        </Link>
        {items.map((item, index) => (
          <div key={item.path} className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            <Link
              to={item.path}
              className={`hover:text-orange-500 transition-colors duration-200 ${
                index === items.length - 1 ? 'text-orange-500 pointer-events-none' : ''
              }`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;
