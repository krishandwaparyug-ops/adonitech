import { useState, useEffect } from "react";

// -----------------------------------------------

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue) => {
    console.log("ghgh");
    setValue((currentValue) => {
      console.log("ghgh1", currentValue, newValue, typeof newValue);
      const result =
        typeof newValue === "function" ? newValue(currentValue) : newValue;
      localStorage.setItem(key, JSON.stringify(result));
      console.log("ghgh2", result);
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
