// src/components/Footer.tsx
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-bold text-white">WorkUp Cards</div>
        <nav className="flex gap-6">
          {["Templates"].map((text) => (
            <Link
              key={text}
              to={`/${text.toLowerCase()}`}
              className="hover:text-white transition"
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
      <p className="text-center text-sm opacity-50 mt-8">
        © 2025 WorkUp Cards. All rights reserved. — Built by{" "}
        <a
          href="https://asterixhdev.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:underline"
        >
          AsterixhDev
        </a>
      </p>
    </footer>
  );
}
