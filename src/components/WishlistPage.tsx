import { Heart, ArrowRight } from 'lucide-react';
import { Car } from '../data/cars';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WishlistPageProps {
  cars: Car[];
  wishlist: string[];
  onViewDetails: (carId: string) => void;
  onToggleWishlist: (carId: string) => void;
  onNavigate: (page: string) => void;
}

export function WishlistPage({ cars, wishlist, onViewDetails, onToggleWishlist, onNavigate }: WishlistPageProps) {
  const wishlistCars = cars.filter((car) => wishlist.includes(car.id));

  const categoryLabels: Record<string, string> = {
    sports: 'Deportivo', luxury: 'Lujo', electric: 'Eléctrico', suv: 'SUV', sedan: 'Sedán',
  };

  if (wishlistCars.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f8fa] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-white border border-border shadow-sm flex items-center justify-center mx-auto mb-8">
            <Heart className="h-12 w-12 text-muted-foreground/40" />
          </div>
          <h1
            className="text-foreground mb-3"
            style={{ fontSize: '1.8rem', fontWeight: 800 }}
          >
            Sin favoritos aún
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            Explora nuestra colección y guarda los vehículos que más te interesen
            para encontrarlos fácilmente después.
          </p>
          <button
            onClick={() => onNavigate('cars')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#030213] text-white font-bold text-sm tracking-wide hover:bg-[#030213]/80 transition-all duration-200 hover:shadow-xl hover:shadow-black/20"
          >
            Explorar vehículos
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8fa]">
      {/* ── Header strip ── */}
      <div className="bg-[#030213] pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em]">
              Mi Lista
            </span>
          </div>
          <h1
            className="text-white"
            style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.1 }}
          >
            Mis Favoritos
          </h1>
          <p className="text-white/40 text-sm mt-2">
            {wishlistCars.length} {wishlistCars.length === 1 ? 'vehículo guardado' : 'vehículos guardados'}
          </p>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistCars.map((car) => (
            <div
              key={car.id}
              className="group bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <ImageWithFallback
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Remove from wishlist */}
                <button
                  onClick={() => onToggleWishlist(car.id)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors"
                  title="Quitar de favoritos"
                >
                  <Heart className="h-4 w-4 fill-white" />
                </button>
                {/* Category */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1 rounded-full capitalize">
                    {categoryLabels[car.category] || car.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-0.5">{car.brand}</p>
                  <h3 className="text-foreground" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    {car.model}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    {car.year} · {car.mileage === 0 ? 'Nuevo' : `${car.mileage.toLocaleString()} km`}
                  </p>
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed mb-5 line-clamp-2">
                  {car.description}
                </p>

                <div className="h-px bg-border mb-5" />

                <div className="flex items-center justify-between gap-3 mt-auto">
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#030213' }}>
                    ${car.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onViewDetails(car.id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#030213] hover:bg-[#030213]/80 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg"
                  >
                    Ver Detalles
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Explore more */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('cars')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-border bg-white hover:border-[#030213]/30 text-foreground font-semibold text-sm transition-all duration-200 hover:shadow-md"
          >
            Explorar más vehículos
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
