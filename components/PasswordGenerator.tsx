"use client";

import { useState } from "react";
import { FiCopy } from "react-icons/fi";

const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [useWords, setUseWords] = useState<boolean>(false);
  const [inputWords, setInputWords] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showCopyNotification, setShowCopyNotification] =
    useState<boolean>(false);

  const generatePassword = () => {
    if (useWords) {
      generateWordBasedPassword();
    } else {
      generateCharacterBasedPassword();
    }
  };

  const generateCharacterBasedPassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(newPassword);
  };

  const generateWordBasedPassword = () => {
    const words = inputWords.split(" ").filter(Boolean);
    let newPassword = words.join("");

    if (includeNumbers) {
      newPassword += Math.floor(Math.random() * 1000);
    }
    if (includeSymbols) {
      newPassword += "!@#$%&*"[Math.floor(Math.random() * 7)];
    }

    if (includeUppercase) {
      newPassword = newPassword
        .split("")
        .map((char, index) =>
          index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        )
        .join("");
    }

    setPassword(newPassword.slice(0, length));
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setShowCopyNotification(true);

      setTimeout(() => setShowCopyNotification(false), 2000);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-lg max-w-md mx-auto mt-10 text-zinc-900 dark:text-zinc-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center">Сгенерировать пароль</h1>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-black dark:text-white">
          Длина пароля:
        </label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full p-2 border rounded bg-zinc-50 dark:bg-zinc-700 dark:border-zinc-600"
          min="4"
          max="64"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
          className="text-rose-500 focus:ring-rose-500"
        />
        <label className="ml-2 text-black dark:text-white">
          Включить заглавные буквы
        </label>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
          className="text-rose-500 focus:ring-rose-500"
        />
        <label className="ml-2 text-black dark:text-white">
          Включить числа
        </label>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
          className="text-rose-500 focus:ring-rose-500"
        />
        <label className="ml-2 text-black dark:text-white">
          Включить спецсимволы
        </label>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={useWords}
          onChange={(e) => setUseWords(e.target.checked)}
          className="text-rose-500 focus:ring-rose-500"
        />
        <label className="ml-2 text-black dark:text-white">
          Генерировать из своих слов
        </label>
      </div>
      {useWords && (
        <textarea
          value={inputWords}
          onChange={(e) => setInputWords(e.target.value)}
          className="w-full p-2 border rounded mt-2 bg-zinc-50 dark:bg-zinc-700 dark:border-zinc-600"
          placeholder="Введите слова через пробел"
          rows={3}
        />
      )}
      <button
        onClick={generatePassword}
        className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600 mt-4"
      >
        Сгенерировать пароль
      </button>
      {password && (
        <div className="mt-4 p-2 bg-white dark:bg-zinc-700 border dark:border-zinc-600 rounded flex items-center justify-between relative">
          <p className="font-mono break-all">{password}</p>
          <div className="flex items-center">
            <button
              onClick={copyToClipboard}
              className="ml-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <FiCopy size={20} />
            </button>
            {showCopyNotification && (
              <div className="ml-2 bg-green-500 text-white p-1 rounded text-xs">
                Скопировано!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
