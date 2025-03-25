
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, ChevronLeft } from "lucide-react";
import { getProductById, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addItem } = useCart();
  
  const product = getProductById(id || "");
  const relatedProducts = getRelatedProducts(id || "");
  
  if (!product) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto py-12"> {/* Reduced page size */}
        
        {/* Back to Products Button */}
        <Button
          className="mb-6 inline-flex items-center bg-black text-white hover:bg-[#f0f0f0] hover:text-black transition-all"
          variant="ghost" 
          size="sm" 
          asChild
        >
          <Link to="/products">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"> {/* Smaller grid */}
          
          <div className="space-y-4">
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover animate-fade-in"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative w-20 aspect-square rounded-md overflow-hidden border-2 transition-all-200 ${
                      activeImageIndex === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm px-2 py-1 bg-secondary rounded-sm">
                  {product.category}
                </span>
                {product.newArrival && (
                  <span className="text-sm px-2 py-1 bg-accent rounded-sm">
                    New
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-medium">{product.name}</h1>
              <div className="mt-2 text-xl">{formatter.format(product.price)}</div> {/* Smaller price */}
            </div>
            
            <p className="text-sm text-muted-foreground">{product.description}</p> {/* Smaller text */}
            
            <div className="pt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                className="w-full bg-black text-white hover:bg-[#f0f0f0] hover:text-black transition-all"
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
              >
                {product.inventory === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              
              <div className="text-sm text-muted-foreground">
                {product.inventory > 0 ? (
                  <span>In Stock: {product.inventory} units</span>
                ) : (
                  <span>Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4">
              <h3 className="text-md font-medium">Product Details</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </TabsContent>
            
            <TabsContent value="shipping" className="pt-4">
              <h3 className="text-md font-medium">Shipping Information</h3>
              <p className="text-sm text-muted-foreground">
                We offer free standard shipping on all orders over ₹999.
              </p>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              <h3 className="text-md font-medium">Customer Reviews</h3>
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
