
import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product) => {
    const exists = favorites.find((fav) => fav.id === product.id);
    if (!exists) {
      setFavorites((prev) => [...prev, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
  };

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
