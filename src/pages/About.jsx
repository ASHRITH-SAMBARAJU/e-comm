// import React from "react";

// const AboutUs = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
//       <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
//         <p className="text-gray-600 text-lg mb-4">
//           Welcome to <span className="text-blue-600 font-semibold">Our E-Commerce Store</span>, 
//           your go-to destination for quality products and an exceptional shopping experience. 
//           We are committed to bringing you the latest trends and best deals.
//         </p>
//         <p className="text-gray-600 text-lg mb-4">
//           Our journey started with a simple goal: to create a seamless and enjoyable shopping 
//           experience for everyone. With a team of dedicated professionals, we strive to ensure 
//           customer satisfaction by offering high-quality products and excellent support.
//         </p>
//         <p className="text-gray-600 text-lg">
//           Thank you for choosing us. We look forward to serving you!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
        <p className="mt-4 text-gray-700">
          Welcome to <Link to="/" className="text-black font-medium">MernGrove</Link>, 
          your go-to destination for quality products and an exceptional shopping experience.
        </p>
        <p className="mt-4 text-gray-700">
          Our journey started with a simple goal: to create a seamless and enjoyable shopping experience for everyone. 
          With a team of dedicated professionals, we strive to ensure customer satisfaction by offering 
          high-quality products and excellent support.
        </p>

        {/* Explore Our Products Button */}
        <div className="mt-6">
          <Link to="/products">
            <button className="bg-black text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-800 transition">
              Explore Our Products
            </button>
          </Link>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="bg-gray-100 mt-12 p-6 md:p-10 rounded-xl text-center">
        <h2 className="text-xl font-semibold text-gray-900">Stay Inspired</h2>
        <p className="text-gray-600 mt-2">
          Subscribe to our newsletter for exclusive offers, new product announcements, and design inspiration.
        </p>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Your email address"
            className="p-3 w-full md:w-1/2 rounded-l-md border border-gray-300 focus:outline-none"
          />
          <button className="bg-black text-white px-6 py-3 rounded-r-md hover:bg-gray-800">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="border-t bg-background py-12 px-6 md:px-12 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              <Link to="/" className="text-black hover:text-gray-700 transition-colors">
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
    </div>
  );
};

export default About;
