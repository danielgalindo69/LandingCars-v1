import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CarsPage } from './components/CarsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { WishlistPage } from './components/WishlistPage';
import { ContactPage } from './components/ContactPage';
import { cars } from './data/cars';

type PageType = 'home' | 'cars' | 'wishlist' | 'product' | 'contact';

const HERO_PAGES: PageType[] = ['home', 'cars'];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    setSelectedCarId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (carId: string) => {
    setSelectedCarId(carId);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (carId: string) => {
    setWishlist((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleGoBack = () => {
    setCurrentPage('cars');
    setSelectedCarId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedCar = selectedCarId ? cars.find((car) => car.id === selectedCarId) : null;
  const isHeroPage = HERO_PAGES.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            cars={cars}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={() => {}}
            onNavigate={handleNavigate}
            wishlist={wishlist}
            cart={[]}
          />
        );

      case 'cars':
        return (
          <CarsPage
            cars={cars}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        );

      case 'product':
        if (!selectedCar) {
          return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
              <p className="text-xl font-semibold mb-4">Vehículo no encontrado</p>
              <button onClick={handleGoBack} className="text-amber-500 hover:underline">
                Volver a vehículos
              </button>
            </div>
          );
        }
        return (
          <ProductDetailPage
            car={selectedCar}
            onGoBack={handleGoBack}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={wishlist.includes(selectedCar.id)}
          />
        );

      case 'wishlist':
        return (
          <WishlistPage
            cars={cars}
            wishlist={wishlist}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
          />
        );

      case 'contact':
        return <ContactPage />;

      default:
        return (
          <HomePage
            cars={cars}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={() => {}}
            onNavigate={handleNavigate}
            wishlist={wishlist}
            cart={[]}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={handleNavigate}
        wishlistCount={wishlist.length}
        isHomePage={isHeroPage}
      />

      <main className={`flex-1 ${isHeroPage || currentPage === 'product' ? '' : 'pt-16'}`}>
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}
