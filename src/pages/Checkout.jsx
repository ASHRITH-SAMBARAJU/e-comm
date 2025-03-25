import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const shippingCharge = totalPrice >= 999 ? 0 : 199;
  const finalTotal = totalPrice + shippingCharge;

  const handlePlaceOrder = () => {
    setStep(4);
    clearCart();
    setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
  };

  return (
    <Layout>
      <div className="container py-12 px-6 md:px-12">
        <h1 className="text-3xl font-medium mb-6">Checkout</h1>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Step 1: Shipping Address</h2>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button onClick={() => setStep(2)} className="bg-black text-white hover:bg-gray-800">
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Step 2: Payment Method</h2>
            <select
              className="w-full p-2 border rounded-md"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            <Button onClick={() => setStep(3)} className="bg-black text-white hover:bg-gray-800">
              Continue to Order Summary
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Step 3: Order Summary</h2>
            <p>Subtotal: ₹{totalPrice}</p>
            <p>Shipping: {shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}</p>
            <p className="font-medium">Total: ₹{finalTotal}</p>
            <Button onClick={handlePlaceOrder} className="bg-green-600 text-white hover:bg-green-700">
              Place Order
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <h2 className="text-xl font-medium">Order Placed Successfully!</h2>
            <p>Thank you for shopping with us. Your order will be delivered soon.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
