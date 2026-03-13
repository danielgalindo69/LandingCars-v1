import { useState } from 'react';
import {
  ArrowLeft, Heart, Share2, Car as CarIcon, Fuel, Gauge,
  Settings, CheckCircle2, Phone, Calendar, Zap,
} from 'lucide-react';
import { Car } from '../data/cars';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailPageProps {
  car: Car;
  onGoBack: () => void;
  onToggleWishlist: (carId: string) => void;
  isInWishlist: boolean;
}

const categoryLabels: Record<string, string> = {
  sports: 'Deportivo', luxury: 'Lujo', electric: 'Eléctrico', suv: 'SUV', sedan: 'Sedán',
};

export function ProductDetailPage({ car, onGoBack, onToggleWishlist, isInWishlist }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [copied, setCopied] = useState(false);

  const images = [car.image, car.hoverImage];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const specs = [
    { icon: Gauge,    label: 'Kilometraje',   value: car.mileage === 0 ? 'Nuevo' : `${car.mileage.toLocaleString()} km` },
    { icon: Settings, label: 'Transmisión',   value: car.transmission === 'automatic' ? 'Automático' : 'Manual' },
    { icon: Fuel,     label: 'Combustible',   value: { gasoline: 'Gasolina', diesel: 'Diésel', electric: 'Eléctrico', hybrid: 'Híbrido' }[car.fuelType] },
    { icon: CarIcon,  label: 'Categoría',     value: categoryLabels[car.category] || car.category },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8fa]">
      {/* ── Top Bar ── */}
      <div className="bg-[#030213] sticky top-16 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-4">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
          <span className="text-white/20">/</span>
          <span className="text-white/40 text-xs">Vehículos</span>
          <span className="text-white/20">/</span>
          <span className="text-white/70 text-xs truncate">{car.brand} {car.model}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Image Gallery ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-xl">
              <ImageWithFallback
                src={images[selectedImage]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
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
              {/* Wishlist & Share */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleShare}
                  className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  title={copied ? '¡Copiado!' : 'Compartir'}
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onToggleWishlist(car.id)}
                  className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isInWishlist
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/40'
                      : 'bg-white/90 backdrop-blur-sm text-muted-foreground hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-200 ${
                    selectedImage === i
                      ? 'ring-2 ring-amber-400 ring-offset-2 shadow-md'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`Vista ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Details ── */}
          <div className="space-y-8">
            {/* Title block */}
            <div>
              <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
                {categoryLabels[car.category]} · {car.year}
              </p>
              <h1
                className="text-foreground mb-4"
                style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.1 }}
              >
                {car.brand} {car.model}
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Price block */}
            <div className="bg-[#030213] rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Precio</p>
                <span className="text-white" style={{ fontSize: '2rem', fontWeight: 800 }}>
                  ${car.price.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Financiamiento</p>
                <p className="text-amber-400 text-sm font-semibold">
                  Desde ${Math.round(car.price / 60).toLocaleString()}/mes
                </p>
              </div>
            </div>

            {/* Specs grid */}
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-4 font-semibold">
                Especificaciones
              </p>
              <div className="grid grid-cols-2 gap-3">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Icon className="h-4.5 w-4.5 text-muted-foreground" style={{ width: '1.1rem', height: '1.1rem' }} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                      <p className="text-foreground font-semibold text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-4 font-semibold flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Equipamiento incluido
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border"
                  >
                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onToggleWishlist(car.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 border ${
                  isInWishlist
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-border text-foreground hover:border-foreground/30 hover:bg-muted/40'
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                {isInWishlist ? 'Guardado en favoritos' : 'Añadir a favoritos'}
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#030213] hover:bg-[#030213]/80 text-white font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-black/20">
                <Calendar className="h-5 w-5" />
                Prueba de manejo
              </button>
            </div>

            {/* Help card */}
            <div className="flex items-center gap-4 p-5 bg-amber-50 border border-amber-100 rounded-2xl">
              <div className="w-11 h-11 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">¿Necesitas ayuda?</p>
                <p className="text-muted-foreground text-xs">Habla con un especialista · (555) 123-4567</p>
              </div>
              <a
                href="tel:+15551234567"
                className="ml-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#030213] text-xs font-bold transition-colors duration-200"
              >
                Llamar
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
