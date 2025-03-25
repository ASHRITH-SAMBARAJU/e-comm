
// import { Link } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import { useState } from "react";
// import { Heart } from "lucide-react";

// const ProductCard = ({ product, variant = "default" }) => {
//   const { addItem, toggleFavorite, favorites } = useCart();
//   const [isFavorited, setIsFavorited] = useState(favorites.some((fav) => fav.id === product.id));

//   const formatter = new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//   });

//   // Ensure price is valid & convert to number if needed
//   let productPrice = product.price;

//   if (typeof productPrice === "string") {
//     productPrice = parseFloat(productPrice); // Convert string to number
//   }

//   if (isNaN(productPrice) || productPrice == null) {
//     productPrice = "Price not available"; // Fallback
//   } else {
//     productPrice = formatter.format(productPrice); // Format valid price
//   }

//   console.log(`Product: ${product.name}, Price: ${productPrice}`); // Debugging log

//   const isFeatured = variant === "featured";

//   const handleToggleFavorite = () => {
//     toggleFavorite(product);
//     setIsFavorited((prev) => !prev);
//   };

//   return (
//     <div
//       className={`group block overflow-hidden transition-transform-200 hover:-translate-y-1 ${
//         isFeatured ? "col-span-2 row-span-2" : ""
//       }`}
//     >
//       <Link to={`/products/${product.id}`}>
//         <div className="relative aspect-square overflow-hidden bg-secondary">
//           <img
//             src={product.images[0]}
//             alt={product.name}
//             className="h-full w-full object-cover transition-all-300 group-hover:scale-105"
//             loading="lazy"
//           />

//           {/* Low Stock & Out of Stock Labels */}
//           {product.inventory < 5 && product.inventory > 0 && (
//             <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-sm">
//               Low Stock
//             </div>
//           )}

//           {product.inventory === 0 && (
//             <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
//               <span className="text-sm font-medium">Out of Stock</span>
//             </div>
//           )}

//           {product.newArrival && (
//             <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-sm">
//               New
//             </div>
//           )}

//           {/* Heart Button for Favorites */}
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               handleToggleFavorite();
//             }}
//             className="absolute top-2 right-2 z-10"
//           >
//             <Heart
//               className={`w-6 h-6 transition-all ${
//                 isFavorited ? "text-red-500 fill-red-500" : "text-gray-500"
//               }`}
//             />
//           </button>
//         </div>
//       </Link>

//       <div className="mt-3 space-y-1">
//         <Link to={`/products/${product.id}`}>
//           <h3
//             className={`font-medium line-clamp-1 ${
//               isFeatured ? "text-lg" : "text-sm"
//             }`}
//           >
//             {product.name}
//           </h3>
//         </Link>

//         {/* Display Price Properly */}
//         <p
//           className={`text-muted-foreground ${isFeatured ? "text-base" : "text-sm"}`}
//         >
//           {productPrice}
//         </p>

//         {/* Add to Cart Button */}
//         <button
//           className="mt-2 w-full flex items-center justify-center gap-1 bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-900 transition-all"
//           onClick={() => addItem(product, 1)}
//         >
//           + Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const ProductCard = ({ product, variant = "default" }) => {
  const { addItem, toggleFavorite, favorites } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(favorites.some((fav) => fav.id === product.id));
  }, [favorites, product.id]);

  // Debug: Log product data to see if price exists
  console.log("Product Data:", product);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  // Ensure price is valid & convert to number if needed
  let productPrice = product?.price;

  if (typeof productPrice === "string") {
    productPrice = parseFloat(productPrice);
  }

  const formattedPrice =
    productPrice !== undefined && productPrice !== null && !isNaN(productPrice)
      ? formatter.format(productPrice)
      : "Price not available";

  console.log(`Product: ${product?.name}, Price: ${formattedPrice}`);

  const isFeatured = variant === "featured";

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    setIsFavorited((prev) => !prev);
  };

  return (
    <div
      className={`group block overflow-hidden transition-transform-200 hover:-translate-y-1 ${
        isFeatured ? "col-span-2 row-span-2" : ""
      }`}
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name || "Product Image"}
            className="h-full w-full object-cover transition-all-300 group-hover:scale-105"
            loading="lazy"
          />

          {product.inventory < 5 && product.inventory > 0 && (
            <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-sm">
              Low Stock
            </div>
          )}

          {product.inventory === 0 && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <span className="text-sm font-medium">Out of Stock</span>
            </div>
          )}

          {product.newArrival && (
            <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-sm">
              New
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              handleToggleFavorite();
            }}
            className="absolute top-2 right-2 z-10"
          >
            <Heart
              className={`w-6 h-6 transition-all ${
                isFavorited ? "text-red-500 fill-red-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </Link>

      <div className="mt-3 space-y-1">
        <Link to={`/products/${product.id}`}>
          <h3 className={`font-medium line-clamp-1 ${isFeatured ? "text-lg" : "text-sm"}`}>
            {product.name || "Unnamed Product"}
          </h3>
        </Link>

        <p className={`text-muted-foreground ${isFeatured ? "text-base" : "text-sm"}`}>
          {formattedPrice}
        </p>

        <button
          className="mt-2 w-full flex items-center justify-center gap-1 bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-900 transition-all"
          onClick={() => addItem(product, 1)}
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
