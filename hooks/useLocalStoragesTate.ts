"use client";

import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialState: T) {
  const [value, setValue] = useState<T>(initialState);
  const [mounted, setMounted] = useState(false);

  // فقط روی کلاینت
  useEffect(() => {
    setMounted(true);

    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue) as T);
      }
    } catch {
      // اگه اینجا کرش کنه یعنی داده‌هات trash ـن
      setValue(initialState);
    }
  }, [key, initialState]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key, mounted]);

  return [value, setValue] as const;
}
