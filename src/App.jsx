import React, { useState } from 'react';
import './assets/css/styles.css';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSlider from './components/ServicesSlider';
import About from './components/About';
import Booking from './components/Booking';
import SpaProducts from './components/SpaProducts';
import Testimonials from './components/Testimonials';
import SocialFollow from './components/SocialFollow';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import VisitAndContact from "./components/VisitAndContact"

function App() {
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems] = useState([]);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <div className="page-wrapper" style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <div className="position-relative">
          <Header
            cartCount={cartItems.length}
            onCartOpen={() => setCartOpen(true)}
          />
          <Hero />
        </div>

        <ServicesSlider />
        <About />
        {/* <Booking /> */}
        {/* <SpaProducts /> */}
        {/* <Testimonials /> */}
        {/* <SocialFollow /> */}
        <VisitAndContact />
        {/* <BlogSection /> */}
        <Footer />
      </div>

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
}

export default App;
