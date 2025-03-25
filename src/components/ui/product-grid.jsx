import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ProductGrid = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-x-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ProductGrid;