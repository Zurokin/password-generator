"use client";

import { useState, useEffect } from "react";
import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import classNames from "classnames";

const DarkModeBtn = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleThemeChange = (selectedTheme: "system" | "light" | "dark") => {
    setTheme(selectedTheme);
    setShowMenu(false);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const buttonCommonClasses =
    "flex w-full items-center gap-x-3.5 px-3 py-2 text-sm rounded-lg focus:outline-none";
  const buttonLightClasses =
    "text-zinc-800 hover:bg-zinc-100 focus:bg-zinc-100";
  const buttonDarkClasses =
    "dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-300 dark:focus:bg-zinc-700";

  return (
    <div className="relative">
      <button
        className={classNames(
          buttonCommonClasses,
          buttonLightClasses,
          buttonDarkClasses,
          { "": !isMobile }
        )}
        onClick={() => setShowMenu(!showMenu)}
      >
        {theme === "system" ? (
          <div className="flex items-center">
            {isMobile ? (
              <DevicePhoneMobileIcon className="h-6 w-6 flex-shrink-0" />
            ) : (
              <ComputerDesktopIcon className="h-6 w-6 flex-shrink-0" />
            )}
            <span className="ml-3">Как в системе</span>
          </div>
        ) : currentTheme === "light" ? (
          <div className="flex items-center">
            <SunIcon className="h-6 w-6 flex-shrink-0 text-rose-500" />
            <span className="ml-3">Всегда светлый</span>
          </div>
        ) : (
          <div className="flex items-center">
            <MoonIcon className="h-6 w-6 flex-shrink-0" />
            <span className="ml-3">Всегда тёмный</span>
          </div>
        )}
      </button>
      {showMenu && (
        <div
          className={classNames(
            "absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-zinc-900",
            { "dark:bg-zinc-800": !isMobile }
          )}
        >
          <button
            className={classNames(
              buttonCommonClasses,
              buttonLightClasses,
              buttonDarkClasses
            )}
            onClick={() => handleThemeChange("system")}
          >
            {isMobile ? (
              <DevicePhoneMobileIcon className="h-6 w-6 flex-shrink-0" />
            ) : (
              <ComputerDesktopIcon className="h-6 w-6 flex-shrink-0" />
            )}
            Как в системе
          </button>
          <button
            className={classNames(
              buttonCommonClasses,
              buttonLightClasses,
              buttonDarkClasses
            )}
            onClick={() => handleThemeChange("light")}
          >
            <SunIcon className="h-6 w-6 flex-shrink-0 text-rose-500" />
            Всегда светлый
          </button>
          <button
            className={classNames(
              buttonCommonClasses,
              buttonLightClasses,
              buttonDarkClasses
            )}
            onClick={() => handleThemeChange("dark")}
          >
            <MoonIcon className="h-6 w-6 flex-shrink-0" />
            Всегда тёмный
          </button>
        </div>
      )}
    </div>
  );
};

export default DarkModeBtn;
