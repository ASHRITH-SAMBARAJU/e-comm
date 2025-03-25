
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import ProductGrid from "@/components/ui/product-grid";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { SlidersHorizontal, Check } from "lucide-react";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // ✅ Helper function to prevent NaN issues
  const parsePrice = (value, fallback = 0) => {
    const parsed = Number(value);
    return isNaN(parsed) ? fallback : parsed;
  };

  const filterProducts = () => {
    let filteredProducts = [...products];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // ✅ Prevent NaN issues by safely parsing prices
    const min = parsePrice(minPrice, 0);
    const max = parsePrice(maxPrice, 100000);

    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min && product.price <= max
    );

    switch (sortOption) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filteredProducts = filteredProducts.filter((product) => product.newArrival)
          .concat(filteredProducts.filter((product) => !product.newArrival));
        break;
      case "best-selling":
        filteredProducts = filteredProducts.filter((product) => product.bestSeller)
          .concat(filteredProducts.filter((product) => !product.bestSeller));
        break;
      default:
        filteredProducts = filteredProducts.filter((product) => product.featured)
          .concat(filteredProducts.filter((product) => !product.featured));
        break;
    }

    return filteredProducts;
  };

  const displayedProducts = filterProducts();
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

  return (
    <Layout>
      <div className="container py-12 px-6 md:px-12">
        <header className="mb-12">
          <h1 className="text-3xl font-medium mb-4">Shop Our Products</h1>
          <p className="text-muted-foreground max-w-3xl">
            Browse our curated collection of minimalist products designed to enhance your everyday life.
            From thoughtfully designed home goods to innovative tech accessories, each item combines form and function beautifully.
          </p>
        </header>

        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-sm border rounded p-1"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="best-selling">Best Selling</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block md:col-span-1`}>
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full justify-start transition-colors duration-300 ${
                      selectedCategory === null
                        ? "bg-black text-white hover:bg-[#f0f0f0] hover:text-black"
                        : "bg-transparent text-black hover:bg-[#f0f0f0]"
                    }`}
                  >
                    {selectedCategory === null && (
                      <Check className="h-4 w-4 mr-2" />
                    )}
                    All Products
                  </Button>

                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full justify-start transition-colors duration-300 ${
                        selectedCategory === category
                          ? "bg-black text-white hover:bg-[#f0f0f0] hover:text-black"
                          : "bg-transparent text-black hover:bg-[#f0f0f0]"
                      }`}
                    >
                      {selectedCategory === category && (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-3">Price Range (INR)</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parsePrice(e.target.value, 0))}
                    min="0"
                    max="100000"
                    className="border rounded p-1 text-sm w-20"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parsePrice(e.target.value, 100000))}
                    min="0"
                    max="100000"
                    className="border rounded p-1 text-sm w-20"
                  />
                </div>
              </div>

              <Separator />
            </div>
          </aside>

          {/* Products */}
          <div className="md:col-span-3">
            <ProductGrid>
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    price: formatter.format(parsePrice(product.price * 1000, 0))
                  }}
                />
              ))}
            </ProductGrid>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
