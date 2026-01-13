// src/components/Header.tsx
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-gray-50/30 backdrop-blur-3xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          WorkUp Cards
        </Link>


      </div>
    </header>
);
}
