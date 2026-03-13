import { useState } from 'react';
import { Heart, Eye, CheckCircle2, Zap, ArrowRight, Gauge, Fuel, Settings } from 'lucide-react';
import { Car } from '../data/cars';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarsPageProps {
  cars: Car[];
  onViewDetails: (carId: string) => void;
  onToggleWishlist: (carId: string) => void;
  wishlist: string[];
}

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  sports:  { bg: 'bg-red-500/15',     text: 'text-red-600',     dot: 'bg-red-500' },
  luxury:  { bg: 'bg-amber-500/15',   text: 'text-amber-700',   dot: 'bg-amber-500' },
  electric:{ bg: 'bg-emerald-500/15', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  suv:     { bg: 'bg-blue-500/15',    text: 'text-blue-700',    dot: 'bg-blue-500' },
  sedan:   { bg: 'bg-purple-500/15',  text: 'text-purple-700',  dot: 'bg-purple-500' },
};

const categoryLabels: Record<string, string> = {
  sports: 'Deportivo',
  luxury: 'Lujo',
  electric: 'Eléctrico',
  suv: 'SUV',
  sedan: 'Sedán',
};

/* ────────────────────────────────────────────────────────────────
   Showroom Car Card – large, hover image swap + features overlay
   ──────────────────────────────────────────────────────────────── */
function ShowroomCarCard({
  car,
  onViewDetails,
  onToggleWishlist,
  isInWishlist,
}: {
  car: Car;
  onViewDetails: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  isInWishlist: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const cat = categoryColors[car.category] || { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-muted-foreground' };

  return (
    <div
      className="group relative rounded-3xl overflow-hidden bg-white border border-border shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image zone ── */}
      <div className="relative overflow-hidden" style={{ height: '280px' }}>
        {/* Primary image */}
        <ImageWithFallback
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        />
        {/* Hover image */}
        <ImageWithFallback
          src={car.hoverImage}
          alt={`${car.brand} ${car.model} interior`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-110'
          }`}
        />

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Features on hover */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-5 transition-all duration-500 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-amber-400" />
            Equipamiento
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {car.features.map((f, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] px-2 py-0.5 rounded-full"
              >
                <CheckCircle2 className="h-2.5 w-2.5 text-amber-400 shrink-0" />
                {f}
              </span>
            ))}
          </div>
          <button
            onClick={() => onViewDetails(car.id)}
            className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-[#030213] rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Ver Detalles
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          {car.isFeatured && (
            <span className="bg-amber-400 text-[#030213] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Destacado
            </span>
          )}
          {car.isLatest && (
            <span className="bg-white text-[#030213] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Nuevo
            </span>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute top-4 right-16 z-10">
          <span className={`${cat.bg} ${cat.text} text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm border border-current/20`}>
            {categoryLabels[car.category] || car.category}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => onToggleWishlist(car.id)}
          className={`absolute top-4 right-4 z-10 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isInWishlist
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 scale-100'
              : `bg-white/90 backdrop-blur-sm text-muted-foreground hover:bg-white hover:text-red-500 ${hovered ? 'opacity-100 scale-100' : 'opacity-70 scale-90'}`
          }`}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* ── Content zone ── */}
      <div className="flex flex-col flex-1 p-6">
        {/* Brand & model */}
        <div className="mb-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-0.5">{car.brand}</p>
          <h3 className="text-foreground" style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.2 }}>
            {car.model}
          </h3>
          <p className="text-muted-foreground text-xs mt-1">
            {car.year} · {car.mileage === 0 ? 'Nuevo' : `${car.mileage.toLocaleString()} km`}
          </p>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Settings className="h-3.5 w-3.5" />
            <span className="capitalize">{car.transmission === 'automatic' ? 'Automático' : 'Manual'}</span>
          </span>
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            <span className="capitalize">{
              { gasoline: 'Gasolina', diesel: 'Diésel', electric: 'Eléctrico', hybrid: 'Híbrido' }[car.fuelType]
            }</span>
          </span>
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            <span className="capitalize">{categoryLabels[car.category]}</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-xs leading-relaxed mb-5 line-clamp-2">
          {car.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-border mb-5" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Precio</p>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#030213' }}>
              ${car.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => onViewDetails(car.id)}
            className="group/btn flex items-center gap-2 bg-[#030213] hover:bg-[#030213]/80 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-black/20"
          >
            Ver Detalles
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CarsPage
   ──────────────────────────────────────────────────────────────── */
export function CarsPage({ cars, onViewDetails, onToggleWishlist, wishlist }: CarsPageProps) {
  const [ferrariWishlisted, setFerrariWishlisted] = useState(false);

  const ferrari = {
    name: 'Ferrari 488 GTB',
    category: 'Deportivo · Supercar',
    description:
      'Una obra maestra de ingeniería italiana. El Ferrari 488 GTB combina una aerodinámica de vanguardia con un motor V8 biturbo de 660 CV, capaz de dispararse de 0 a 100 km/h en 3 segundos. Una experiencia de conducción sin igual.',
    price: 298500,
    features: ['Motor V8 Biturbo 3.9L', '660 CV', '0–100 en 3s', 'Traction Control F1', 'E-Diff 3', 'SCM-E Magneti Marelli'],
    image: 'https://images.unsplash.com/photo-1572409509958-340a45666fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGZXJyYXJpJTIwcmVkJTIwc3VwZXJjYXIlMjBmcm9udCUyMGRyYW1hdGljfGVufDF8fHx8MTc3MzQxNTUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    hoverImage: 'https://images.unsplash.com/photo-1760689044995-bf161137e058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGZXJyYXJpJTIwaW50ZXJpb3IlMjBjb2NrcGl0JTIwcmVkJTIwbGVhdGhlcnxlbnwxfHx8fDE3NzM0MTU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Ferrari Hero Split ──────────────────────────────────── */}
      <section className="relative flex flex-col lg:flex-row min-h-screen pt-16">
        {/* Left – Ferrari image */}
        <div className="relative lg:w-1/2 min-h-[50vh] lg:min-h-screen overflow-hidden">
          <FerrariHeroImage mainImg={ferrari.image} hoverImg={ferrari.hoverImage} />
          {/* Gradient bridge to the right */}
          <div className="hidden lg:block absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-[#030213]" />
        </div>

        {/* Right – Info card */}
        <div className="lg:w-1/2 bg-[#030213] flex items-center justify-center px-8 md:px-16 py-16 lg:py-24">
          <div className="max-w-lg w-full">
            {/* Pre-title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-amber-400" />
              <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.35em]">
                Vehículo Estelar
              </span>
            </div>

            <h1
              className="text-white mb-2"
              style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.1 }}
            >
              {ferrari.name}
            </h1>
            <p className="text-amber-400/70 text-sm mb-6 uppercase tracking-widest">{ferrari.category}</p>

            <p className="text-white/60 leading-relaxed mb-8 text-sm">
              {ferrari.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-10">
              {ferrari.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-8" />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#030213] font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/30">
                ${ferrari.price.toLocaleString()} — Consultar
              </button>
              <button
                onClick={() => setFerrariWishlisted(!ferrariWishlisted)}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border font-semibold text-sm tracking-wide transition-all duration-300 ${
                  ferrariWishlisted
                    ? 'border-red-500 bg-red-500/15 text-red-400'
                    : 'border-white/20 text-white hover:border-white/50 hover:bg-white/5'
                }`}
              >
                <Heart className={`h-5 w-5 ${ferrariWishlisted ? 'fill-red-400' : ''}`} />
                {ferrariWishlisted ? 'Guardado' : 'Favoritos'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cars Grid ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#f8f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Nuestro Inventario
            </p>
            <h2
              className="text-foreground mb-4"
              style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2 }}
            >
              Toda la Colección
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Vehículos premium seleccionados a mano. Pasa el cursor sobre cada card para
              descubrir el interior y las características clave.
            </p>
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <ShowroomCarCard
                key={car.id}
                car={car}
                onViewDetails={onViewDetails}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlist.includes(car.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* Small helper: Ferrari hero with subtle hover zoom */
function FerrariHeroImage({ mainImg, hoverImg }: { mainImg: string; hoverImg: string }) {
  const [h, setH] = useState(false);
  return (
    <div
      className="w-full h-full cursor-pointer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <ImageWithFallback
        src={mainImg}
        alt="Ferrari 488 GTB"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          h ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      />
      <ImageWithFallback
        src={hoverImg}
        alt="Ferrari interior"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          h ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
      {/* Overlay for dark mood */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030213]/80 to-transparent lg:hidden" />
    </div>
  );
}
