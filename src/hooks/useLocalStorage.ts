import { useState, useEffect } from 'react';

type LocalStorageValue<T> = T | null;

function useLocalStorage<T>(key: string, initialValue?: T) {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState<LocalStorageValue<T>>(() => {
    try {
      // Obtener del localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue || null;
    }
  });

  // Guardar en localStorage cuando cambie el valor
  const setValue = (value: T | ((val: LocalStorageValue<T>) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Eliminar un elemento específico
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  };

  // Obtener todos los elementos del localStorage
  const getAllItems = () => {
    try {
      return { ...window.localStorage };
    } catch (error) {
      console.error('Error getting all localStorage items:', error);
      return {};
    }
  };

  // Limpiar todo el localStorage
  const clearAll = () => {
    try {
      window.localStorage.clear();
      setStoredValue(null);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  // Sincronizar cambios entre pestañas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (error) {
          console.error('Error parsing localStorage value:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    getAllItems,
    clearAll,
  };
}

export default useLocalStorage;