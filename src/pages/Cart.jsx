
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, Heart, HeartOff, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavourtiesContext";



const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const shippingCost = totalPrice < 999 ? 199 : 0;
  const finalTotal = totalPrice + shippingCost;

  return (
    <Layout>
      <div className="container py-12 px-6 md:px-12">
        <h1 className="text-3xl font-medium mb-6">Your Cart</h1>

        <div className="flex justify-start gap-4 mb-4">
          <Button
            onClick={() => setShowFavorites(!showFavorites)}
            className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
          >
            <Heart className="h-5 w-5" />
            {showFavorites ? "Hide Favorites" : "View Favorites"}
          </Button>

          <Button
            onClick={clearCart}
            className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
          >
            <Trash2 className="h-5 w-5" /> Clear Cart
          </Button>
        </div>

        {showFavorites ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.length > 0 ? (
              favorites.map((fav) => (
                <div key={fav.id} className="bg-white shadow-md rounded-lg overflow-hidden animate-fade-in">
                  <Link to={`/products/${fav.id}`}>
                    <img src={fav.images[0]} alt={fav.name} className="h-48 w-full object-cover" />
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${fav.id}`}>
                      <h3 className="text-lg font-medium">{fav.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{formatter.format(fav.price)}</p>
                    <Button
                      onClick={() => removeFromFavorites(fav.id)}
                      className="mt-2 bg-red-500 text-white hover:bg-red-700 flex items-center gap-2"
                    >
                      <HeartOff className="h-5 w-5" /> Remove from Favorites
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full py-12">
                <p className="text-lg">No favorites added yet.</p>
              </div>
            )}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <div className="flex justify-center">
              <ShoppingBag className="h-16 w-16 text-muted" />
            </div>
            <h2 className="text-xl font-medium">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-6 pb-6 border-b animate-fade-in">
                  <div className="flex-shrink-0">
                    <Link to={`/products/${item.product.id}`}>
                      <div className="h-24 w-24 sm:h-32 sm:w-32 bg-secondary overflow-hidden rounded-md">
                        <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                    </Link>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/products/${item.product.id}`} className="font-medium hover:underline">
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1">{item.product.category}</div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        onClick={() => (isFavorite(item.product.id) ? removeFromFavorites(item.product.id) : addToFavorites(item.product))}
                        className={`ml-4 flex items-center gap-2 ${isFavorite(item.product.id) ? "bg-red-500 hover:bg-red-700" : "bg-gray-300 hover:bg-gray-500"}`}
                      >
                        <Heart className="h-5 w-5" />
                        {isFavorite(item.product.id) ? "Remove Favorite" : "Add to Favorites"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              <p>Subtotal: {formatter.format(totalPrice)}</p>
              <p>Shipping: {formatter.format(shippingCost)}</p>
              <p className="font-medium">Total: {formatter.format(finalTotal)}</p>
              <Button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 bg-black text-white hover:bg-gray-800 flex items-center gap-2"
              >
                <CreditCard className="h-5 w-5" /> Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
