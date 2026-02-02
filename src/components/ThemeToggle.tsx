import { useTheme } from '../contexts';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="ThemeToggle-button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <span className="ThemeToggle-icon" aria-hidden="true">🌙</span>
      ) : (
        <span className="ThemeToggle-icon" aria-hidden="true">☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;
