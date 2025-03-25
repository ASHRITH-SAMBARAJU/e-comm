
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load cart and favorites from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedFavorites = localStorage.getItem("favorites");

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }

    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // Save cart and favorites to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add item to cart
  const addItem = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        toast.success(`Updated quantity for ${product.name}`);
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      toast.success(`Added ${product.name} to cart`);
      return [...prevItems, { product, quantity }];
    });
  };

  // Remove item from cart
  const removeItem = (productId) => {
    const item = items.find((item) => item.product.id === productId);
    if (item) {
      toast.success(`Removed ${item.product.name} from cart`);
    }
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  // Toggle Favorite (Add/Remove)
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === product.id);

      if (isFavorite) {
        toast.info(`Removed ${product.name} from favorites`);
        return prevFavorites.filter((fav) => fav.id !== product.id);
      } else {
        toast.success(`Added ${product.name} to favorites`);
        return [...prevFavorites, product];
      }
    });
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    toast.success(`Cart cleared`);
  };

  // Get total item count and price
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        favorites,
        addItem,
        removeItem,
        toggleFavorite,
        clearCart,
        itemCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
