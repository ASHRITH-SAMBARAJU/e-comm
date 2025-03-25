
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Layout from "@/components/layout/Layout";
// import ProductCard from "@/components/product/ProductCard";
// import { Button } from "@/components/ui/button";
// import { getNewArrivals } from "@/data/products";

// const NewArrivals = () => {
//   const [newArrivals, setNewArrivals] = useState([]);

//   useEffect(() => {
//     setNewArrivals(getNewArrivals());
//   }, []);

//   return (
//     <Layout>
//       {/* Header Section */}
//       <section className="bg-gradient-to-b from-gray-50 to-white py-16 text-center">
//         <div className="container mx-auto px-6 md:px-12">
//           <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">🌟 New Arrivals 🌟</h1>
//           <p className="mt-4 text-lg text-gray-600">
//             Discover the latest trends and styles in our newest collection.
//           </p>
//         </div>
//       </section>

//       {/* Product Grid */}
//       <section className="py-16 px-6 md:px-12 bg-gray-50">
//         <div className="container mx-auto">
//           {newArrivals.length === 0 ? (
//             <p className="text-center text-gray-600">No new arrivals at the moment.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//               {newArrivals.map((product) => (
//                 <div
//                   key={product.id}
//                   className="transition-transform duration-300 transform hover:scale-105"
//                 >
//                   <ProductCard product={product} />
//                 </div>
//               ))}
//             </div>
//           )}
//           {/* View More Button */}
//           <div className="text-center mt-12">
//             <Button variant="outline" className="px-6 py-3 text-lg">
//               View More
//             </Button>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default NewArrivals;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { getNewArrivals } from "@/data/products";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const arrivals = getNewArrivals();
    if (arrivals.length > 0) {
      setNewArrivals([...arrivals, arrivals[0]]); // Adding one more existing product
    } else {
      setNewArrivals(arrivals);
    }
  }, []);

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 text-center">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">🌟 New Arrivals 🌟</h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover the latest trends and styles in our newest collection.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="container mx-auto">
          {newArrivals.length === 0 ? (
            <p className="text-center text-gray-600">No new arrivals at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {newArrivals.map((product) => (
                <div
                  key={product.id}
                  className="transition-transform duration-300 transform hover:scale-105"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          {/* View More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" className="px-6 py-3 text-lg">
              View More
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewArrivals;
