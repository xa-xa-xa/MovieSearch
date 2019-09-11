import React, { useState, useContext } from 'react';

export const LocalContext = React.createContext();

export function useLocalState(localItem) {
  const [local, setState] = useState(localStorage.getItem(localItem));

  const setLocal = newItem => {
    localStorage.setItem(localItem, newItem);
    setState(newItem);
  };

  return [local, setLocal];
}
