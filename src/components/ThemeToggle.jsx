import { useMovies } from "../context/MoviesContext";

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useMovies();
  const isDark = theme === "dark";

  return (
    <div className="theme__container">
      <button
        className={`theme-toggle ${isDark ? "dark" : "light"}`}
        onClick={toggleTheme}
      >
        <div className="toggle__track">
          <div className="toggle__icon">{theme === "dark" ? "🌙" : "☀️"}</div>
        </div>
      </button>
      <div className={className}>{theme === "dark" ? "Dark" : "Light"}</div>
    </div>
  );
}
