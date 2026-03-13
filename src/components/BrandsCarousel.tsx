const brands = [
  { name: 'BMW', tagline: 'The Ultimate Driving Machine' },
  { name: 'Mercedes-Benz', tagline: 'The Best or Nothing' },
  { name: 'Porsche', tagline: 'There is no substitute' },
  { name: 'Audi', tagline: 'Vorsprung durch Technik' },
  { name: 'Tesla', tagline: 'Accelerating the Future' },
  { name: 'Range Rover', tagline: 'Above & Beyond' },
  { name: 'Toyota', tagline: 'Let\'s Go Places' },
  { name: 'Lexus', tagline: 'Experience Amazing' },
  { name: 'Ferrari', tagline: 'We are the competition' },
  { name: 'Lamborghini', tagline: 'Expect the Unexpected' },
];

// Duplicate for seamless infinite loop
const allBrands = [...brands, ...brands];

export function BrandsCarousel() {
  return (
    <section className="py-14 bg-white border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.3em]">
          Trusted Brands We Carry
        </p>
      </div>

      {/* Carousel Track */}
      <div className="relative flex overflow-hidden">
        {/* Edge fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Edge fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-brands-scroll gap-0">
          {allBrands.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center px-10 py-4 group cursor-default shrink-0"
            >
              {/* Brand initial circle */}
              <div className="w-12 h-12 rounded-full bg-muted/60 group-hover:bg-[#030213] flex items-center justify-center mb-3 transition-all duration-300 border border-border group-hover:border-[#030213] group-hover:shadow-lg">
                <span className="text-sm font-bold text-muted-foreground group-hover:text-amber-400 transition-colors duration-300">
                  {brand.name.charAt(0)}
                </span>
              </div>
              {/* Brand name */}
              <span className="text-foreground/50 group-hover:text-foreground font-semibold text-sm whitespace-nowrap transition-colors duration-300 tracking-wide">
                {brand.name}
              </span>
              {/* Tagline */}
              <span className="text-muted-foreground/40 group-hover:text-muted-foreground text-[10px] whitespace-nowrap transition-colors duration-300 mt-0.5 italic">
                {brand.tagline}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
