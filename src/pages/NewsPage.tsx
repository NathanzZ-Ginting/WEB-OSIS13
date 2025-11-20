
import { Navbar } from '../components/Navbar';
import { News } from '../components/News';
import { Footer } from '../components/Footer';
export function NewsPage() {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <News />
      </main>
      <Footer />
    </div>;
}