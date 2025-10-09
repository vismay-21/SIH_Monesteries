import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-saffron/5 border-t border-saffron/20 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-700">
        <div className="flex justify-center space-x-4 mb-2">
          <Link to="/" className="hover:text-saffron transition-colors">Home</Link>
          <Link to="/journey-planner" className="hover:text-saffron transition-colors">Highlights</Link>
          <Link to="/team" className="hover:text-saffron transition-colors">Team</Link>
        </div>
        <p className="text-gray-500 text-xs">
          Made with ❤️ for Smart India Hackathon 2025
        </p>
      </div>
    </footer>
  );
}
