import ProfileForm from '../components/forms/ProfileForm';
import AddressForm from '../components/forms/AddressForm';
import ContactForm from '../components/forms/ContactForm';

const SettingsPage = () => (
  <div>
    <h1>Settings</h1>
    <ProfileForm />
    <AddressForm />
    <ContactForm />
  </div>
);

export default SettingsPage;
