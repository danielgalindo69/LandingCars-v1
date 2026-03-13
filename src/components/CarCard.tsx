import { useState } from 'react';
import { Heart, Eye, Zap, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Car } from '../data/cars';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarCardProps {
  car: Car;
  onViewDetails: (carId: string) => void;
  onToggleWishlist: (carId: string) => void;
  onAddToCart: (carId: string) => void;
  isInWishlist: boolean;
  isInCart: boolean;
}

const categoryColors: Record<string, string> = {
  sports: 'bg-red-500/15 text-red-600 border-red-200',
  luxury: 'bg-amber-500/15 text-amber-700 border-amber-200',
  electric: 'bg-emerald-500/15 text-emerald-700 border-emerald-200',
  suv: 'bg-blue-500/15 text-blue-700 border-blue-200',
  sedan: 'bg-purple-500/15 text-purple-700 border-purple-200',
};

export function CarCard({
  car,
  onViewDetails,
  onToggleWishlist,
  onAddToCart,
  isInWishlist,
  isInCart,
}: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {/* Primary Image */}
        <ImageWithFallback
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        />
        {/* Hover Image */}
        <ImageWithFallback
          src={car.hoverImage}
          alt={`${car.brand} ${car.model} interior`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-110'
          }`}
        />

        {/* Dark gradient overlay – always present, intensifies on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Features overlay – slides up on hover */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-5 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-white/70 text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-amber-400" />
            Key Features
          </p>
          <div className="flex flex-wrap gap-1.5">
            {car.features.map((feature, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs px-2.5 py-1 rounded-full"
              >
                <CheckCircle2 className="h-2.5 w-2.5 text-amber-400 shrink-0" />
                {feature}
              </span>
            ))}
          </div>

          {/* Quick CTA on hover */}
          <button
            onClick={() => onViewDetails(car.id)}
            className="mt-4 w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-[#030213] rounded-xl text-sm font-semibold tracking-wide transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {car.isFeatured && (
            <span className="bg-amber-400 text-[#030213] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Featured
            </span>
          )}
          {car.isLatest && (
            <span className="bg-white text-[#030213] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(car.id); }}
          className={`absolute top-3 right-3 z-10 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isInWishlist
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/40'
              : 'bg-white/90 backdrop-blur-sm text-muted-foreground hover:bg-white hover:text-red-500'
          } ${isHovered || isInWishlist ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Brand & Model */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">{car.brand}</p>
            <h3 className="font-semibold text-foreground text-base leading-tight">{car.model}</h3>
            <p className="text-muted-foreground text-xs mt-1">
              {car.year} · {car.mileage === 0 ? 'Brand New' : `${car.mileage.toLocaleString()} mi`}
            </p>
          </div>
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border capitalize ${
              categoryColors[car.category] || 'bg-muted text-muted-foreground border-border'
            }`}
          >
            {car.category}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-4" />

        {/* Price & Action */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Starting at</p>
            <span className="text-xl font-bold text-foreground">
              ${car.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetails(car.id); }}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-[#030213] hover:bg-[#030213]/80 text-white shadow-sm hover:shadow-md"
          >
            Ver Detalles
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}