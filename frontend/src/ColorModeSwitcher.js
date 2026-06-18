import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const getInitialMode = () =>
  typeof window !== 'undefined' &&
  document.documentElement.classList.contains('dark');

export const ColorModeSwitcher = () => {
  const [isDark, setIsDark] = useState(getInitialMode);

  const handleToggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('color-mode', next ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-md text-lg text-gray-700 transition hover:bg-black/10 dark:text-gray-200 dark:hover:bg-white/10"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ColorModeSwitcher;
