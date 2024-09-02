import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('@dark-mode-react-tailwind:theme-1.0.0', newTheme);
    setTheme(newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('@dark-mode-react-tailwind:theme-1.0.0');

    if (themeFromLocalStorage) {
      setTheme(themeFromLocalStorage);
      if (themeFromLocalStorage === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  return (
    <button
      className="p-2 bg-custom-300 dark:bg-dark-custom-300 text-custom-500 dark:text-dark-custom-100 rounded"
      onClick={toggleTheme}
    >
      {theme === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
