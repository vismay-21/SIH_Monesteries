import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-saffron/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Site name + tagline */}
        <Link to="/" className="flex flex-col">
          <span className="font-monastery text-2xl font-bold text-saffron tracking-tight">
            Monastery360
          </span>
          <span className="text-xs text-gray-500 hidden sm:block">
            Journey through 200+ Sacred Sanctuaries
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-saffron transition-colors">Home</Link>
          <Link to="/journey-planner" className="hover:text-saffron transition-colors">Highlights</Link>
          <Link to="/team" className="hover:text-saffron transition-colors">Team</Link>
        </nav>

        {/* Right: Hackathon Label */}
        <div className="text-xs font-semibold text-saffron border border-saffron/40 rounded-full px-3 py-1 bg-saffron/10">
          🏆 Built for Smart India Hackathon 2025
        </div>
      </div>
    </header>
  );
}
