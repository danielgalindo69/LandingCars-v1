import { ArrowRight, Star, Shield, Headphones, Award, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { CarCard } from './CarCard';
import { TestimonialsSection } from './TestimonialsSection';
import { BrandsCarousel } from './BrandsCarousel';
import { Car } from '../data/cars';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  cars: Car[];
  onViewDetails: (carId: string) => void;
  onToggleWishlist: (carId: string) => void;
  onAddToCart: (carId: string) => void;
  onNavigate: (page: string) => void;
  wishlist: string[];
  cart: string[];
}

const whyChooseItems = [
  {
    icon: Star,
    number: '01',
    title: 'Premium Quality',
    description: 'Only the finest vehicles from the world\'s most prestigious automotive brands, hand-selected for excellence.',
    accent: 'from-amber-400 to-amber-600',
  },
  {
    icon: Shield,
    number: '02',
    title: 'Full Warranty Coverage',
    description: 'Comprehensive protection packages that give you total peace of mind from day one of ownership.',
    accent: 'from-blue-400 to-blue-600',
  },
  {
    icon: Headphones,
    number: '03',
    title: 'Expert Concierge',
    description: 'Dedicated specialists available around the clock — because extraordinary service never sleeps.',
    accent: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: Award,
    number: '04',
    title: 'Award Winning',
    description: 'Recognized globally for excellence in automotive retail, with over 25 years of industry leadership.',
    accent: 'from-purple-400 to-purple-600',
  },
];

export function HomePage({
  cars,
  onViewDetails,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
  wishlist,
  cart,
}: HomePageProps) {
  const featuredCars = cars.filter((car) => car.isFeatured);
  const latestCars = cars.filter((car) => car.isLatest);

  return (
    <div className="min-h-screen">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury car showroom"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Pre-title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-400" />
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em]">
                Premium Automotive
              </span>
            </div>

            <h1
              className="text-white mb-6"
              style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Drive Your
              <span className="block text-amber-400">Dreams.</span>
            </h1>

            <p className="text-white/70 mb-10 max-w-xl" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              Discover the world's finest collection of luxury and performance vehicles.
              Curated for those who demand nothing but the extraordinary.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('cars')}
                className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-[#030213] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/30 hover:-translate-y-0.5"
              >
                Explore Collection
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="inline-flex items-center gap-3 border border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              >
                Book a Test Drive
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-14 pt-8 border-t border-white/15">
              {[
                { value: '500+', label: 'Vehicles' },
                { value: '25+', label: 'Years' },
                { value: '98%', label: 'Satisfied' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white font-bold" style={{ fontSize: '1.5rem' }}>{stat.value}</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4 text-white/40 animate-bounce" />
        </div>
      </section>

      {/* ─── Why Choose AutoLux ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="text-amber-500 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
                Our Promise
              </p>
              <h2
                className="text-foreground"
                style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 }}
              >
                Why Choose AutoLux?
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm mt-4 md:mt-0 text-sm leading-relaxed">
              We deliver more than vehicles — we deliver a complete premium ownership experience
              built around your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="relative overflow-hidden rounded-2xl border border-border bg-white p-8 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 cursor-default"
                >
                  {/* Decorative large number */}
                  <span
                    className="absolute -top-3 -right-1 select-none pointer-events-none text-muted/40 font-black"
                    style={{ fontSize: '5rem', lineHeight: 1 }}
                  >
                    {item.number}
                  </span>

                  {/* Icon container */}
                  <div
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-7 shadow-lg group-hover:scale-110 transition-transform duration-400`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-foreground mb-3"
                    style={{ fontWeight: 700, fontSize: '1rem' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bottom accent bar */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Featured Cars ────────────────────────────────────────── */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-500 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
                Hand-Picked Selection
              </p>
              <h2
                className="text-foreground"
                style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 }}
              >
                Featured Cars
              </h2>
            </div>
            <Button variant="outline" onClick={() => onNavigate('cars')} className="hidden sm:flex gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={onViewDetails}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={() => {}}
                isInWishlist={wishlist.includes(car.id)}
                isInCart={false}
              />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" onClick={() => onNavigate('cars')} className="gap-2">
              View All Cars <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Latest Models ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-500 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
                Just Arrived
              </p>
              <h2
                className="text-foreground"
                style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 }}
              >
                Latest Models
              </h2>
            </div>
            <Button variant="outline" onClick={() => onNavigate('cars')} className="hidden sm:flex gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {latestCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={onViewDetails}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={() => {}}
                isInWishlist={wishlist.includes(car.id)}
                isInCart={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ─── Brands Carousel ──────────────────────────────────────── */}
      <BrandsCarousel />
    </div>
  );
}