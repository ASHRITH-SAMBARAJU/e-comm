
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <p className="text-2xl font-medium mb-6">Page not found</p>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="text-white" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
