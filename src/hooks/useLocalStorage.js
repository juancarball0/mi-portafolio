import { useState, useEffect } from 'react';

/**
 * Hook personalizado: useLocalStorage
 * Igual que useState pero persiste el valor en localStorage.
 * @param {string} clave  - Nombre de la clave en localStorage
 * @param {*}     valorInicial - Valor a usar si la clave no existe
 */
const useLocalStorage = (clave, valorInicial) => {
  // Inicializamos leyendo localStorage (función lazy de useState)
  const [valor, setValor] = useState(() => {
    try {
      const item = localStorage.getItem(clave);
      return item !== null ? JSON.parse(item) : valorInicial;
    } catch {
      // Si localStorage no está disponible, usamos el valor inicial
      return valorInicial;
    }
  });

  // Sincronizamos con localStorage cada vez que cambia el valor
  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  }, [clave, valor]);

  return [valor, setValor];
};

export default useLocalStorage;
