
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const Navbar = ({ products }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/new-arrivals", label: "New Arrivals" },
    { path: "/about", label: "About" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products?.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 shadow-md",
        isScrolled ? "py-4 bg-gray-100/80 backdrop-blur-lg border-b" : "py-6 bg-white"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Prev and Next Buttons */}
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go Back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate(1)} aria-label="Go Forward">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <Link to="/" className="text-xl font-medium text-gray-800 hover:opacity-80 transition-opacity">
          MernGrove
        </Link>

        <nav className="hidden md:flex items-center space-x-8 relative">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={cn(
                "relative text-sm font-medium transition hover:text-gray-900 pb-2",
                location.pathname === link.path ? "text-primary" : "text-gray-700"
              )}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-primary rounded-lg transition-all duration-300"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="px-4 py-2 rounded-md border w-56 outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500 h-5 w-5" />
            {searchQuery && (
              <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      onClick={() => setSearchQuery("")}
                    >
                      {product.name}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-fade-in">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Hey, {user.username}</span>
              <Button variant="outline" className="px-4 py-2" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="px-4 py-2">
                Sign In | Sign Up
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
