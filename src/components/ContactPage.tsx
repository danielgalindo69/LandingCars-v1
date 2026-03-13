import { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle,
  Car, ChevronDown, Instagram, Facebook, Twitter,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type FormState = 'idle' | 'sending' | 'sent';

interface FormData {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  subject: string;
  message: string;
}

const vehicleOptions = [
  'BMW M4 Competition',
  'Mercedes-Benz S-Class',
  'Tesla Model S Plaid',
  'Porsche 911 Turbo S',
  'Range Rover Sport SVR',
  'Audi RS6 Avant',
  'Otro vehículo',
];

const contactInfo = [
  { icon: MapPin,  label: 'Showroom',  value: '123 Luxury Auto Boulevard, Beverly Hills, CA 90210' },
  { icon: Phone,   label: 'Teléfono',  value: '(555) 123-4567' },
  { icon: Mail,    label: 'Email',     value: 'info@autolux.com' },
  { icon: Clock,   label: 'Horario',   value: 'Lun – Sáb: 9:00 am – 7:00 pm' },
];

/* ─── Floating-label input ─── */
function FloatingInput({
  id, label, type = 'text', value, onChange, required = false,
}: {
  id: string; label: string; type?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 pt-6 pb-2.5 rounded-xl border bg-white/60 backdrop-blur-sm text-foreground text-sm outline-none transition-all duration-200 peer ${
          focused
            ? 'border-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.15)]'
            : 'border-border hover:border-muted-foreground/40'
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          active
            ? 'top-2 text-[10px] font-semibold uppercase tracking-wider text-amber-600'
            : 'top-1/2 -translate-y-1/2 text-sm text-muted-foreground'
        }`}
      >
        {label}{required && <span className="ml-0.5 text-amber-500">*</span>}
      </label>
    </div>
  );
}

/* ─── Floating-label textarea ─── */
function FloatingTextarea({
  id, label, value, onChange, rows = 4,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 pt-7 pb-3 rounded-xl border bg-white/60 backdrop-blur-sm text-foreground text-sm outline-none transition-all duration-200 resize-none ${
          focused
            ? 'border-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.15)]'
            : 'border-border hover:border-muted-foreground/40'
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          active
            ? 'top-2 text-[10px] font-semibold uppercase tracking-wider text-amber-600'
            : 'top-5 text-sm text-muted-foreground'
        }`}
      >
        Mensaje
      </label>
    </div>
  );
}

/* ─── Custom Select ─── */
function FloatingSelect({
  id, label, value, onChange, options,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 pt-6 pb-2.5 rounded-xl border bg-white/60 backdrop-blur-sm text-foreground text-sm outline-none transition-all duration-200 appearance-none ${
          focused
            ? 'border-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.15)]'
            : 'border-border hover:border-muted-foreground/40'
        } ${value === '' ? 'text-transparent' : ''}`}
      >
        <option value="" disabled />
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          active
            ? 'top-2 text-[10px] font-semibold uppercase tracking-wider text-amber-600'
            : 'top-1/2 -translate-y-1/2 text-sm text-muted-foreground'
        }`}
      >
        {label}
      </label>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

/* ─── ContactPage ─── */
export function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', vehicle: '', subject: '', message: '',
  });
  const [status, setStatus] = useState<FormState>('idle');

  const set = (key: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1800);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-72 flex items-end justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1765171103212-f20f14f9b0a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzaG93cm9vbSUyMG5pZ2h0JTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzczNDE1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="AutoLux Showroom"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030213] via-[#030213]/70 to-[#030213]/20" />
        <div className="relative z-10 text-center pb-12 px-4">
          <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.35em] mb-3">
            Estamos aquí para ti
          </p>
          <h1
            className="text-white"
            style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}
          >
            Contáctanos
          </h1>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────── */}
      <section className="py-20 bg-[#f8f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* ── Left sidebar ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info card */}
              <div className="bg-[#030213] rounded-3xl p-8 text-white relative overflow-hidden">
                {/* decorative glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-2 mb-6">
                  <Car className="h-6 w-6 text-amber-400" />
                  <span className="font-bold text-lg">Auto<span className="text-amber-400">Lux</span></span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  Nuestro equipo de especialistas está listo para ayudarte a encontrar el vehículo de tus sueños.
                  No dudes en contactarnos.
                </p>

                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center shrink-0">
                        <Icon className="h-4.5 w-4.5 text-amber-400" style={{ width: '1.1rem', height: '1.1rem' }} />
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-white/80 text-sm leading-snug">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="mt-8 pt-8 border-t border-white/10 flex gap-3">
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-9 h-9 rounded-xl bg-white/10 hover:bg-amber-400/20 hover:text-amber-400 text-white/60 flex items-center justify-center transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-3xl overflow-hidden border border-border relative bg-muted" style={{ height: '200px' }}>
                <iframe
                  title="AutoLux Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203786087!2d-118.40426192357!3d34.0736483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-border" />
              </div>
            </div>

            {/* ── Form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-border p-8 md:p-10">
                {status === 'sent' ? (
                  /* Success state */
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-6">
                      <CheckCircle className="h-10 w-10 text-emerald-500" />
                    </div>
                    <h3
                      className="text-foreground mb-3"
                      style={{ fontSize: '1.5rem', fontWeight: 700 }}
                    >
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-8">
                      Gracias por contactarnos. Un especialista de AutoLux se pondrá en contacto contigo en
                      menos de 24 horas.
                    </p>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', vehicle: '', subject: '', message: '' }); }}
                      className="px-8 py-3 rounded-xl bg-[#030213] text-white text-sm font-semibold hover:bg-[#030213]/80 transition-colors duration-200"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
                        Formulario de contacto
                      </p>
                      <h2
                        className="text-foreground"
                        style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.2 }}
                      >
                        ¿En qué podemos ayudarte?
                      </h2>
                      <p className="text-muted-foreground text-sm mt-2">
                        Completa el formulario y nos pondremos en contacto contigo a la brevedad.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Row: name + email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FloatingInput
                          id="name"
                          label="Nombre completo"
                          value={form.name}
                          onChange={set('name')}
                          required
                        />
                        <FloatingInput
                          id="email"
                          label="Correo electrónico"
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          required
                        />
                      </div>

                      {/* Row: phone + vehicle */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FloatingInput
                          id="phone"
                          label="Teléfono"
                          type="tel"
                          value={form.phone}
                          onChange={set('phone')}
                        />
                        <FloatingSelect
                          id="vehicle"
                          label="Vehículo de interés"
                          value={form.vehicle}
                          onChange={set('vehicle')}
                          options={vehicleOptions}
                        />
                      </div>

                      {/* Subject */}
                      <FloatingInput
                        id="subject"
                        label="Asunto"
                        value={form.subject}
                        onChange={set('subject')}
                        required
                      />

                      {/* Message */}
                      <FloatingTextarea
                        id="message"
                        label="Mensaje"
                        value={form.message}
                        onChange={set('message')}
                        rows={5}
                      />

                      {/* Privacy note */}
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Al enviar este formulario, aceptas nuestra{' '}
                        <span className="text-amber-600 underline underline-offset-2 cursor-pointer">
                          política de privacidad
                        </span>
                        . No compartimos tu información con terceros.
                      </p>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-4 rounded-xl bg-[#030213] hover:bg-[#030213]/80 text-white font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-black/20 flex items-center justify-center gap-3 disabled:opacity-60"
                      >
                        {status === 'sending' ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Enviando…
                          </>
                        ) : (
                          <>
                            Enviar Mensaje
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Bottom trust strip */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { value: '< 24h', label: 'Tiempo de respuesta' },
                  { value: '100%', label: 'Confidencial' },
                  { value: '5★', label: 'Valoración media' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-2xl border border-border p-4 text-center shadow-sm"
                  >
                    <p className="text-foreground font-bold" style={{ fontSize: '1.1rem' }}>{item.value}</p>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
