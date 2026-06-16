import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Specialties from "@/components/Specialties";
import Menu from "@/components/Menu";
import PrivateDining from "@/components/PrivateDining";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import Reservation from "@/components/Reservation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col html.light:bg-light-bg text-foreground">
      {/* Sticky Header Navigation */}
      <Header />

      {/* Page Sections */}
      <main className="flex-grow">
        {/* Hero Banner with CTAs */}
        <Hero />

        {/* About Us Legacy Narrative */}
        <About />

        {/* Signature Dishes Grid */}
        <Specialties />

        {/* Searchable Categorized Menu */}
        <Menu />

        {/* Private Suites & Event Hosting */}
        <PrivateDining />

        {/* Customer Reviews & Ratings Stats */}
        <Reviews />

        {/* Photo Gallery Grid with Zoom Overlay */}
        <Gallery />

        {/* Table Booking Reservation System */}
        <Reservation />

        {/* Map, Contact Form & FAQs accordions */}
        <Contact />
      </main>

      {/* Footnote details, hours & Copyright */}
      <Footer />

      {/* Floating communication buttons */}
      <FloatingActions />

      {/* Slide-out Shopping Cart drawer */}
      <CartDrawer />
    </div>
  );
}
