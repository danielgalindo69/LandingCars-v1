import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    id: 1,
    name: 'James Hartwell',
    role: 'CEO, Hartwell Ventures',
    avatar: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'AutoLux redefined what I thought a car-buying experience could be. From the moment I walked in, everything was handled with extraordinary attention to detail. My Porsche 911 was delivered immaculate — exactly as promised.',
    car: 'Porsche 911 Turbo S',
  },
  {
    id: 2,
    name: 'Sophia Laurent',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1770235622504-3851a96ac6ef?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'I\'ve purchased three vehicles through AutoLux now, and each time the experience surpasses the last. The team genuinely cares about finding you the perfect match — not just making a sale. Truly world-class service.',
    car: 'Mercedes-Benz S-Class',
  },
  {
    id: 3,
    name: 'Marcus Delano',
    role: 'Entrepreneur & Car Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1764084051438-369ad6a09334?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'The transparency, the craftsmanship of the process, and the sheer quality of inventory — AutoLux is in a league of its own. My BMW M4 arrived ahead of schedule and exceeded every expectation I had.',
    car: 'BMW M4 Competition',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#030213] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Client Testimonials
          </p>
          <h2 className="text-white mb-4" style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 }}>
            What Our Clients Say
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Trusted by discerning drivers worldwide. Here's what sets AutoLux apart
            in the words of those who matter most.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] hover:border-amber-400/20 transition-all duration-400 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote
                  className="h-8 w-8 text-amber-400/60 group-hover:text-amber-400 transition-colors duration-300"
                  fill="currentColor"
                />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-white/70 leading-relaxed mb-8 text-sm italic">
                "{testimonial.review}"
              </p>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-6" />

              {/* Person */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ImageWithFallback
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400/30"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#030213]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-white/40 text-xs">{testimonial.role}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] text-amber-400/70 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-full">
                    {testimonial.car}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
          {[
            { value: '2,400+', label: 'Happy Clients' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '25 Yrs', label: 'Of Excellence' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-amber-400 mb-1" style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stat.value}</p>
              <p className="text-white/40 text-xs uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
