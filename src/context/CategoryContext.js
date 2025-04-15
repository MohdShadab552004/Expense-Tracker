'use client'

import { createContext, useContext, useState } from 'react';

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categoriesdata, setcategories] = useState({});

  return (
    <CategoryContext.Provider value={{ categoriesdata, setcategories }}>
      {children}
    </CategoryContext.Provider>
  );
}
