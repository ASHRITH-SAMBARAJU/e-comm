
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "./context/FavourtiesContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"; 
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AboutUs from "./pages/About";
import Navbar from "./components/layout/Navbar";
import NewArrivals from "./pages/NewArrivals";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

    if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      console.error("❌ VITE_GOOGLE_CLIENT_ID is undefined. Check your .env file.");
    }
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <CartProvider>
              <FavoritesProvider>
                <Toaster />
                <Sonner />
                <Navbar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} /> {/* ✅ Added Checkout Route */}
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </FavoritesProvider>
            </CartProvider>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
