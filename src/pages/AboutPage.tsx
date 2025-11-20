
import { Navbar } from '../components/Navbar';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
export function AboutPage() {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <About />
      </main>
      <Footer />
    </div>;
}