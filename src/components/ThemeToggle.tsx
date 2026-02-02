import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="ThemeToggle-button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          className="ThemeToggle-icon"
          aria-hidden="true"
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
