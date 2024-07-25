// src/pages/checkout.tsx
import CartViewer from '../components/viewers/CartViewer';
import PaymentInformationForm from '../components/forms/PaymentInformationForm';

const CheckoutPage = () => (
  <div>
    <h1>Checkout</h1>
    <CartViewer items={[]} /> {/* Ensure items prop is passed */}
    <PaymentInformationForm />
  </div>
);

export default CheckoutPage;
