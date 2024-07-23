import CartViewer from '../components/viewers/CartViewer';
import PaymentInformationForm from '../components/forms/PaymentInformationForm';

const CheckoutPage = () => (
  <div>
    <h1>Checkout</h1>
    <CartViewer />
    <PaymentInformationForm />
  </div>
);

export default CheckoutPage;
