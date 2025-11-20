
import { Navbar } from '../components/Navbar';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
export function ContactPage() {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ContactForm />
      </main>
      <Footer />
    </div>;
}