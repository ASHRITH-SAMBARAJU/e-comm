import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t bg-background py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            <Link to="/" className="hover:text-foreground transition-colors">
              MernGrove
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            Minimalist designs for modern living. Quality craftsmanship with attention to detail.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Shop</h4>
          <ul className="space-y-2">
            {['/products', '/new-arrivals', '/best-sellers', '/sale'].map((path, index) => (
              <li key={index}>
                <Link to={path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {path.replace('/', '').replace('-', ' ').toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Company</h4>
          <ul className="space-y-2">
            {['/about', '/sustainability', '/careers', '/contact'].map((path, index) => (
              <li key={index}>
                <Link to={path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {path.replace('/', '').replace('-', ' ').toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Customer Support</h4>
          <ul className="space-y-2">
            {['/faq', '/shipping', '/warranty', '/privacy'].map((path, index) => (
              <li key={index}>
                <Link to={path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {path.replace('/', '').replace('-', ' ').toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} MernGrove. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="#" aria-label="Instagram">
            <FaInstagram className="w-5 h-5 hover:text-foreground transition-colors" />
          </Link>
          <Link to="#" aria-label="Twitter">
            <FaTwitter className="w-5 h-5 hover:text-foreground transition-colors" />
          </Link>
          <Link to="#" aria-label="Facebook">
            <FaFacebook className="w-5 h-5 hover:text-foreground transition-colors" />
          </Link>
          <Link to="#" aria-label="LinkedIn">
            <FaLinkedin className="w-5 h-5 hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
