"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const GOLD = "#C9A86A";
const BURGUNDY = "#3A0E18";

function Reveal({ children, delay = 0, scale = false, className = "" }: { children: React.ReactNode; delay?: number; scale?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${scale ? "reveal reveal-scale" : "reveal"} ${visible ? "visible" : ""} ${delay === 1 ? "reveal-delay-1" : delay === 2 ? "reveal-delay-2" : delay === 3 ? "reveal-delay-3" : ""} ${className}`}>
      {children}
    </div>
  );
}

function CustomSelect({ value, onChange, options }: { value: number | string; onChange: (v: number | string) => void; options: { value: number | string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const label = options.find((o) => o.value === value)?.label || String(value);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between rounded-xl border-2 border-black/10 bg-white px-3 py-3 pr-3 text-sm font-bold text-[#1A0A0E] hover:border-[#C9A86A]/40 focus:border-[#C9A86A] focus:ring-2 focus:ring-[#C9A86A]/20 shadow-sm transition">
        <span>{label}</span><span className={`text-[#3A0E18] transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-20 rounded-xl border-2 border-[#C9A86A]/20 bg-white shadow-2xl overflow-hidden max-h-[220px] overflow-y-auto">
          {options.map((o) => (
            <button key={String(o.value)} type="button" onClick={() => { onChange(o.value); setOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm font-bold hover:bg-[#F5F0E8] transition ${String(o.value) === String(value) ? "bg-[#3A0E18] text-white hover:bg-[#3A0E18]" : "text-[#1A0A0E]"}`}>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [splash, setSplash] = useState(true);
  const [splashExit, setSplashExit] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setSplashExit(true), 1700);
    const t2 = setTimeout(() => setSplash(false), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const [checkIn, setCheckIn] = useState("2026-08-28");
  const [checkOut, setCheckOut] = useState("2026-08-29");
  const [guests, setGuests] = useState(2);
  const [customGuests, setCustomGuests] = useState(11);
  const effectiveGuests = guests === 11 ? customGuests : guests;
  const [banquetGuests, setBanquetGuests] = useState("50-100");
  const [showToast, setShowToast] = useState<string | null>(null);

  const handleBook = (e?: React.FormEvent) => {
    e?.preventDefault();
    setShowToast(`Checking availability: ${checkIn} → ${checkOut} for ${effectiveGuests} guests — from ₹1,294 (MakeMyTrip) / ₹1,319 (Agoda). Call 082521 34696`);
    setTimeout(() => setShowToast(null), 4500);
  };
  const handleBanquet = () => document.getElementById("banquet")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#0D0708] text-[#F5F0E8] overflow-x-hidden">
      {splash && (
        <div className={`fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[#0D0708] text-[#F5F0E8] ${splashExit ? "splash-exit" : ""}`}>
          <div className="absolute inset-0 bg-mocha opacity-90" />
          <div className="relative flex flex-col items-center">
            <div className="h-[72px] w-[88px] rounded-[14px] border flex flex-col items-center justify-center gap-1 shadow-[0_0_40px_rgba(201,168,106,0.25)]" style={{ borderColor: GOLD, background: "rgba(255,255,255,0.04)", animation: "crownPulse 1.2s ease infinite" }}>
              <span style={{ color: GOLD }} className="text-[24px] leading-none">♔</span>
              <span className="text-[13px] font-bold tracking-[0.22em]" style={{ color: GOLD }}>HCP</span>
            </div>
            <div className="mt-5 text-center">
              <div className="font-serif text-xl tracking-[0.18em] font-semibold">HOTEL CROWN PATLIPUTRA</div>
              <div className="text-xs tracking-[0.22em] opacity-60 mt-1">होटल क्राउन पाटलिपुत्र · 4.7 ★ (69)</div>
            </div>
            <div className="mt-8 w-[220px] h-[3px] rounded-full bg-white/10 overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ background: `linear-gradient(90deg, ${GOLD}, #E8C99A)`, animation: "fill 1.6s ease forwards" }} />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: "shimmer 1s 0.3s ease infinite" }} />
            </div>
            <div className="mt-3 text-[11px] tracking-[0.16em] opacity-50">Warm hospitality loading…</div>
          </div>
          <div className="absolute bottom-6 text-[10px] tracking-[0.14em] opacity-40">4A Vivekanand Park Rd · Patliputra · J4F6+MQ</div>
        </div>
      )}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[6px] border flex items-center justify-center" style={{ borderColor: GOLD, background: "rgba(0,0,0,0.35)" }}>
              <span className="text-[11px] font-bold tracking-[0.12em]" style={{ color: GOLD }}>HCP</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-[13px] font-bold tracking-[0.16em]">HOTEL CROWN PATLIPUTRA</div>
              <div className="text-[11px] tracking-[0.14em] opacity-70">होटल क्राउन पाटलिपुत्र · A UNIT OF RAV HOSPITALITY</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs tracking-[0.14em] opacity-90">
            <a href="#about" className="hover:text-white transition">ABOUT</a>
            <a href="#rooms" className="hover:text-white transition">ROOMS</a>
            <a href="/booking" className="hover:text-white transition border border-white/20 px-3 py-1 rounded-full">BOOKING</a>
            <a href="#banquet" className="hover:text-white transition">BANQUET</a>
            <a href="#gallery" className="hover:text-white transition">GALLERY</a>
            <a href="#location" className="hover:text-white transition">LOCATION</a>
          </nav>
          <a href="/booking" className="rounded-full px-5 py-2.5 text-xs font-semibold tracking-[0.14em] border hover:bg-[#C9A86A] hover:text-[#1A0A0E] transition" style={{ borderColor: GOLD, color: GOLD }}>BOOK NOW</a>
        </div>
      </header>

      {/* HERO — Background Helper — animated behind scene */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <div className="absolute inset-0 hero-bg">
          <Image src="/hero.jpg" alt="Hotel Crown Patliputra Facade" fill priority className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-[#0D0708]/5 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0708] via-[#0D0708]/65 to-transparent" />
        <div className="absolute inset-x-0 top-[6%] flex justify-center pointer-events-none select-none overflow-hidden hero-crown">
          <span className="text-giant text-white text-[18vw] lg:text-[16vw] xl:text-[15vw] leading-none whitespace-nowrap" style={{ opacity: 0.11, textShadow: "0 0 40px rgba(255,255,255,0.9), 0 0 80px rgba(255,255,255,0.4)" }}>CROWN</span>
        </div>
        <div className="absolute right-[18%] top-[28%] h-28 w-28 rounded-full bg-white/20 blur-[28px] pointer-events-none hero-flare" />
        <div className="absolute right-[22%] top-[32%] h-16 w-16 rounded-full bg-[#C9A86A]/15 blur-[18px] pointer-events-none hero-flare" style={{ animationDelay: "1.2s" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pt-14">
          <div className="mb-5 flex flex-col items-center hero-rise hero-rise-1">
            <div className="h-[54px] w-[64px] rounded-[10px] border flex flex-col items-center justify-center gap-0.5" style={{ borderColor: GOLD, background: "rgba(24,12,15,0.55)", backdropFilter: "blur(8px)" }}>
              <span style={{ color: GOLD }} className="text-[18px] leading-none">♔</span>
              <span className="text-[11px] font-bold tracking-[0.2em]" style={{ color: GOLD }}>HCP</span>
            </div>
            <div className="mt-3 text-[11px] tracking-[0.28em] font-semibold" style={{ color: "#E8C99A" }}>HOTEL CROWN PATLIPUTRA</div>
            <div className="text-[11px] tracking-[0.22em] opacity-60 mt-1">होटल क्राउन पाटलिपुत्र · A World of Warm Hospitality</div>
          </div>
          <h1 className="font-serif text-[42px] sm:text-[56px] lg:text-[64px] font-[350] leading-[0.95] tracking-[-0.02em] max-w-[820px] hero-rise hero-rise-2" style={{ fontFamily: "var(--font-playfair)" }}>
            <span className="block font-light">Experience Pure</span><span className="block font-semibold">Comfort</span>
          </h1>
          <p className="mt-4 max-w-[520px] text-sm sm:text-[15px] leading-6 opacity-80 hero-rise hero-rise-3">Stay central, celebrate grand — rooms & banquets in the heart of Patliputra, with rooftop views and warm Bihari hospitality.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 hero-rise hero-rise-4">
            <a href="/booking" className="group relative overflow-hidden rounded-full px-10 py-3.5 text-xs font-bold tracking-[0.16em] text-center border shadow-[0_8px_30px_rgba(201,168,106,0.35),0_2px_8px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(201,168,106,0.5),0_4px_12px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300" style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #E8C99A 45%, ${GOLD} 100%)`, color: "#1A0A0E", borderColor: "#E8C99A" }}>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              <span className="relative flex items-center justify-center gap-2">BOOK YOUR STAY <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </a>
            <button onClick={handleBanquet} className="rounded-full px-8 py-3.5 text-xs font-semibold tracking-[0.14em] border backdrop-blur bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#1A0A0E] transition">BANQUET ENQUIRY</button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] tracking-[0.14em] opacity-70 hero-rise hero-rise-5">
            <span>4.7 ★ (69) · Hotel</span><span className="h-1 w-1 rounded-full bg-white/60" /><span>4A Vivekanand Park Rd · J4F6+MQ</span><span className="h-1 w-1 rounded-full bg-white/60" /><span>LGBTQ+ friendly</span>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[36px] bg-[#0D0708] rounded-t-[50%_36px] border-t border-white/5" />
      </section>

      {/* BOOKING BAR — with real OTA prices */}
      <section id="booking" className="bg-mocha border-y border-white/5">
        <Reveal className="mx-auto max-w-[1180px] px-6 lg:px-8 py-5">
          <form onSubmit={handleBook} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 bg-[#F5F0E8] rounded-2xl p-3 shadow-2xl">
            <div className="flex flex-1 gap-3">
              <label className="flex-1 bg-white rounded-xl px-4 py-3 border border-black/10">
                <div className="text-[10px] tracking-[0.14em] text-black/50 font-semibold">CHECK-IN</div>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-transparent text-sm font-medium text-[#1A0A0E] outline-none" />
              </label>
              <label className="flex-1 bg-white rounded-xl px-4 py-3 border border-black/10">
                <div className="text-[10px] tracking-[0.14em] text-black/50 font-semibold">CHECK-OUT</div>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-transparent text-sm font-medium text-[#1A0A0E] outline-none" />
              </label>
              <div className="w-[168px] hidden sm:flex flex-col gap-1">
                <div className="text-[10px] tracking-[0.16em] text-black/50 font-extrabold px-1">GUESTS</div>
                <CustomSelect value={guests} onChange={(v)=> setGuests(Number(v))} options={[...[1,2,3,4,5,6,7,8,9,10].map(n=> ({ value: n, label: `${n} ${n===1?'Guest':'Guests'}` })), { value: 11, label: '10+ Guests — custom' }]} />
              </div>
              {guests===11 && (
                <label className="w-[130px] hidden sm:flex flex-col bg-white rounded-xl px-4 py-3 border-2 border-[#C9A86A]/40 shadow-sm">
                  <div className="text-[10px] tracking-[0.16em] text-black/50 font-extrabold">NO. OF GUESTS</div>
                  <input type="number" min={11} max={50} value={customGuests} onChange={(e)=> setCustomGuests(Math.max(11, Number(e.target.value)||11))} placeholder="e.g. 12" className="bg-transparent text-sm font-bold text-[#1A0A0E] outline-none" />
                </label>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden xl:block text-xs text-black/60 mr-2 text-right leading-tight">Compare: MakeMyTrip ₹1,294 · Agoda ₹1,319 · More from ₹1,311<br/><span className="opacity-60">Free cancellation only</span></div>
              <a href="/booking" className="flex-1 lg:flex-none rounded-full px-8 py-4 text-xs font-bold tracking-[0.14em] whitespace-nowrap text-center" style={{ background: BURGUNDY, color: "#F5F0E8" }}>GO TO BOOKING PAGE</a>
              <button type="submit" className="hidden lg:inline-flex rounded-full px-6 py-4 text-xs font-bold tracking-[0.14em] whitespace-nowrap border" style={{ borderColor: BURGUNDY, color: BURGUNDY }}>CHECK AVAILABILITY</button>
            </div>
          </form>
          <div className="mt-2 flex flex-wrap gap-2 text-xs opacity-60 justify-center lg:justify-end">
            <span className="bg-white/10 px-3 py-1 rounded-full">Sponsored: Agoda ₹1,319 →</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">All options: MakeMyTrip ₹1,294 → See rooms</span>
            <a href="tel:08252134696" className="bg-[#C9A86A] text-[#1A0A0E] px-3 py-1 rounded-full font-semibold">Call 082521 34696</a>
          </div>
        </Reveal>
      </section>

      {/* ABOUT — new section from your data — gold shiny */}
      <section id="about" className="bg-gold-shiny text-[#1A0A0E]">
        <Reveal className="mx-auto max-w-[1180px] px-6 lg:px-8 py-10">
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="font-serif text-2xl font-extrabold tracking-tight">About — Hotel Details</h2>
            <span className="text-sm font-bold opacity-80">होटल क्राउन पाटलिपुत्र · 4.7 ★ (69) · Hotel</span>
            <span className="text-xs bg-[#3A0E18] text-white px-3 py-1 rounded-full font-bold">LGBTQ+ friendly</span>
          </div>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <Reveal delay={1} className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl border border-black/15 p-5 shadow-lg">
                <div className="text-xs tracking-[0.14em] font-extrabold text-[#1A0A0E]">ADDRESS & CONTACT</div>
                <div className="mt-2 text-sm font-bold leading-6 text-[#1A0A0E]">4 A, 1, Vivekanand Park Rd, Patna, Bihar 800013<br/>Patliputra Colony · Plus Code: <span className="font-mono font-extrabold">J4F6+MQ Patna, Bihar</span></div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href="tel:08252134696" className="rounded-full px-4 py-2 text-xs font-extrabold border-2" style={{ borderColor: BURGUNDY, color: BURGUNDY }}>☎ 082521 34696</a>
                  <a href="https://www.google.com/maps/place/HOTEL+CROWN+PATLI/@25.6242306,85.1119586,17z" target="_blank" className="rounded-full px-4 py-2 text-xs font-extrabold bg-[#3A0E18] text-white">Directions</a>
                  <span className="rounded-full px-4 py-2 text-xs font-bold border border-black/10 bg-white">Save · Nearby · Share</span>
                </div>
                <div className="mt-3 text-xs font-semibold opacity-80">Check-in: 12:00 pm · Check-out: 11:00 am · Free cancellation only (OTA)</div>
              </div>
              <div className="bg-white rounded-2xl border border-black/15 p-5 shadow-lg">
                <div className="text-xs tracking-[0.14em] font-extrabold text-[#1A0A0E]">LOCATION SUMMARY</div>
                <div className="mt-2 flex items-center gap-2"><span className="text-sm font-extrabold">Patliputra Colony</span><span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">4.3 · Great for visitors</span></div>
                <p className="text-sm font-semibold text-[#1A0A0E] mt-1">Midtown suburban zone, with shops & a cinema at P&M Mall, plus Sai temple & Patliputra Park greenery.</p>
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  <div className="bg-[#F5F0E8] rounded-xl p-3 border border-black/5"><div className="font-extrabold text-[#1A0A0E]">Things to do</div><div className="font-semibold text-black/70">Bihar Museum 25m, Golghar 30m</div></div>
                  <div className="bg-[#F5F0E8] rounded-xl p-3 border border-black/5"><div className="font-extrabold text-[#1A0A0E]">Transit</div><div className="font-semibold text-black/70">Patna Station 6 min · 2.2 mi</div></div>
                  <div className="bg-[#F5F0E8] rounded-xl p-3 border border-black/5"><div className="font-extrabold text-[#1A0A0E]">Airports</div><div className="font-semibold text-black/70">PAT 13 min · 5.2 mi · Gaya 68.9 mi</div></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={2} className="space-y-4">
              <div className="bg-white rounded-2xl border border-black/15 p-5 shadow-lg">
                <div className="text-xs tracking-[0.14em] font-extrabold text-[#1A0A0E]">GOOGLE REVIEW SUMMARY · 4.7 (69)</div>
                <div className="mt-2 h-2 bg-black/10 rounded-full overflow-hidden"><div className="h-full bg-[#C9A86A]" style={{ width: "94%" }} /></div>
                <div className="mt-2 flex gap-1 text-xs font-bold opacity-80"><span>5 ★ █████</span><span>4 ★ ████</span><span>3 ★</span></div>
                <p className="text-sm font-bold leading-6 mt-3 text-[#1A0A0E]">Guests mention clean, spacious, comfortable rooms + good food. Excellent service, helpful staff, good housekeeping. Affordable price, good value for money. <span className="font-semibold opacity-60">Summarized with Gemini +34</span></p>
                <a href="#reviews" className="text-xs font-bold underline mt-2 inline-block">Write a review</a>
              </div>
              <div className="bg-white rounded-2xl border border-black/15 p-5 shadow-lg">
                <div className="text-xs tracking-[0.14em] font-extrabold text-[#1A0A0E]">HOTEL DETAILS · AMENITIES</div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
                  <span className="flex gap-2 bg-emerald-50 border border-emerald-300 rounded-full px-3 py-2">✓ Free Wi-Fi</span>
                  <span className="flex gap-2 bg-amber-50 border border-amber-300 rounded-full px-3 py-2">₹ Paid breakfast</span>
                  <span className="flex gap-2 bg-emerald-50 border border-emerald-300 rounded-full px-3 py-2">✓ Free parking</span>
                  <span className="flex gap-2 bg-emerald-50 border border-emerald-300 rounded-full px-3 py-2">✓ Air-conditioned</span>
                  <span className="flex gap-2 bg-emerald-50 border border-emerald-300 rounded-full px-3 py-2">✓ Accessible</span>
                  <span className="flex gap-2 bg-white border border-black/15 rounded-full px-3 py-2">— Pool</span>
                </div>
                <button onClick={() => setShowToast("Full amenities: 24h reception, luggage storage, smoke detectors, fire extinguishers, electric kettle, etc.")} className="text-xs font-bold underline mt-3">View more amenities</button>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* 3 PILLARS */}
      <section className="bg-mocha">
        <Reveal className="mx-auto max-w-[1120px] px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
            <Reveal delay={1} className="flex flex-col items-center text-center px-8 py-8"><div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/15 mb-3" style={{ color: GOLD }}>♔</div><div className="text-sm font-semibold">Trusted Hospitality</div><div className="text-xs opacity-60 mt-1 max-w-[220px]">Warm, attentive service — 24h reception & shuttle</div><div className="mt-2 text-[10px] tracking-[0.12em] opacity-40">4.7 ★ (69)</div></Reveal>
            <Reveal delay={2} className="flex flex-col items-center text-center px-8 py-8"><div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/15 mb-3" style={{ color: GOLD }}>🛋</div><div className="text-sm font-semibold">Elegant Rooms</div><div className="text-xs opacity-60 mt-1 max-w-[220px]">Luxurious rooms with AC, TV, kettle & city views</div></Reveal>
            <Reveal delay={3} className="flex flex-col items-center text-center px-8 py-8"><div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/15 mb-3" style={{ color: GOLD }}>🍽</div><div className="text-sm font-semibold">Spice Restaurant</div><div className="text-xs opacity-60 mt-1 max-w-[220px]">Indian & international cuisine + rooftop bar</div></Reveal>
          </div>
        </Reveal>
      </section>

      {/* SUITE CARDS */}
      <section id="rooms" className="bg-mocha pb-14">
        <Reveal className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Deluxe Double Room", img: "/hotel-3.png", size: "Clean, spacious · AC · Air-conditioned", price: "₹1,294" },
              { title: "Family Room", img: "/hotel-1.png", size: "Comfortable · Good housekeeping", price: "₹1,319" },
              { title: "Executive Suite", img: "/hotel-2.png", size: "Excellent service · Helpful staff", price: "₹1,311" },
            ].map((r, i) => (
              <Reveal key={r.title} delay={(i+1) as 1|2|3} scale className="rounded-[16px] overflow-hidden bg-[#F5F0E8] text-[#1A0A0E] shadow-xl flex flex-col">
                <div className="relative h-[210px] overflow-hidden"><Image src={r.img} alt={r.title} fill className="object-cover" /><span className="absolute left-3 top-3 rounded-full bg-black/70 text-white text-[10px] tracking-[0.12em] px-3 py-1 border border-white/20">4.7 ★ POPULAR</span></div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-[16px] font-serif font-semibold">{r.title}</div>
                  <div className="text-xs opacity-60 mt-1">{r.size}</div>
                  <div className="text-xs mt-2 opacity-70">From <span className="font-bold text-[#3A0E18]">{r.price} / night</span> <span className="text-[10px]">· Free Wi-Fi · Paid breakfast</span></div>
                  <div className="mt-2 text-[11px] tracking-[0.12em] opacity-40">4.7 ★ (69) · Google reviews</div>
                  <a href="/booking" className="mt-4 w-full rounded-full py-3 text-xs font-bold tracking-[0.14em] border text-center block hover:bg-[#3A0E18] hover:text-white transition" style={{ borderColor: BURGUNDY, color: BURGUNDY }}>BOOK NOW — GO TO BOOKING PAGE</a>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-7 flex justify-center"><a href="#booking" className="rounded-full px-8 py-3 text-xs font-bold tracking-[0.14em] hover:scale-105 transition" style={{ background: GOLD, color: "#1A0A0E" }}>VIEW ALL SUITES — Compare: MakeMyTrip · Agoda</a></div>
        </Reveal>
      </section>

      {/* BANQUET — gold shiny */}
      <section id="banquet" className="bg-gold-shiny text-[#1A0A0E]">
        <Reveal className="mx-auto max-w-[1180px] px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="text-xs tracking-[0.18em] font-bold" style={{ color: BURGUNDY }}>BANQUET & CONFERENCE · 20,000 SQ FT TBD</div>
              <h2 className="font-serif text-3xl lg:text-4xl leading-tight mt-2">Celebrate grand. Up to 1,200 guests.</h2>
              <p className="mt-3 text-sm opacity-70 leading-6">Patliputra’s central banquet venue — rooftop & sun terrace vibe. Capacity TBD — verify with 082521 34696.</p>
              <ul className="mt-4 text-sm opacity-80 space-y-1 list-disc pl-5">
                <li>4.7 rating · clean, spacious, comfortable rooms · affordable, good value</li>
                <li>Free parking · Free Wi-Fi · Air-conditioned · Accessible · Paid breakfast</li>
                <li>Check-in 12:00 pm · Check-out 11:00 am · J4F6+MQ</li>
              </ul>
              <form onSubmit={(e) => { e.preventDefault(); setShowToast("Banquet enquiry sent — Team will call 082521 34696 within 2h"); setTimeout(() => setShowToast(null), 4000); }} className="mt-6 grid grid-cols-2 gap-3">
                <input placeholder="Name *" required className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none bg-white" />
                <input placeholder="Phone *" required className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none bg-white" />
                <input placeholder="Event Date" type="date" className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none bg-white" />
                <CustomSelect value={banquetGuests} onChange={(v)=> setBanquetGuests(String(v))} options={[{value:'50-100',label:'50–100 Guests'},{value:'100-300',label:'100–300 Guests'},{value:'300-1200',label:'300–1200 Guests'}]} />
                <button className="col-span-2 rounded-full py-3.5 text-xs font-bold tracking-[0.14em] text-white hover:opacity-90 transition" style={{ background: BURGUNDY }}>SEND ENQUIRY</button>
              </form>
            </Reveal>
            <Reveal delay={2} scale className="relative h-[420px] rounded-2xl overflow-hidden bg-black/5 border border-black/10">
              <Image src="/hotel-1.png" alt="Banquet facade" fill className="object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <div className="text-xs tracking-[0.14em] opacity-70">4 A, 1 Vivekanand Park Rd · J4F6+MQ</div><div className="font-serif text-xl">Hotel Crown Patliputra</div>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-mocha py-10">
        <Reveal className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            <Reveal className="rounded-2xl bg-[#F5F0E8] text-[#1A0A0E] p-7"><div className="text-yellow-600 text-xs">★★★★★ 4.7</div><p className="font-serif text-lg leading-snug mt-2">“Clean, spacious, and comfortable rooms, with good food options.”</p><div className="text-xs opacity-60 mt-3">— Google review summary · 69 reviews</div></Reveal>
            <Reveal delay={1} className="rounded-2xl bg-[#F5F0E8]/90 text-[#1A0A0E] p-7"><div className="text-yellow-600 text-xs">★★★★★ 4.7</div><p className="font-serif text-lg leading-snug mt-2">“Excellent service, helpful staff, and good housekeeping — affordable, good value.”</p><div className="text-xs opacity-60 mt-3">— Google review summary</div></Reveal>
          </div>
        </Reveal>
      </section>

      <section id="gallery" className="bg-[#0D0708] py-10 border-t border-white/5">
        <Reveal className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="flex items-end justify-between"><h3 className="font-serif text-2xl">Photos & videos — Gallery</h3><span className="text-xs opacity-60">All · Rooms · Exterior · Food & drink</span></div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <Reveal className="relative h-[220px] rounded-xl overflow-hidden"><Image src="/hotel-1.png" alt="Exterior" fill className="object-cover" /></Reveal>
            <Reveal delay={1} className="relative h-[220px] rounded-xl overflow-hidden"><Image src="/hotel-2.png" alt="Reception HCP" fill className="object-cover" /></Reveal>
            <Reveal delay={2} className="relative h-[220px] rounded-xl overflow-hidden"><Image src="/hotel-3.png" alt="Room" fill className="object-cover" /></Reveal>
          </div>
        </Reveal>
      </section>

      <section id="location" className="bg-gold-shiny text-[#1A0A0E] py-12">
        <Reveal className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-2xl">Find us at Patliputra</h3>
              <p className="text-sm opacity-70 mt-2">4 A, 1, Vivekanand Park Rd, Road No-01, Patliputra Colony, Patna 800013 — J4F6+MQ · 082521 34696</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white rounded-xl p-4 border border-black/10"><div className="font-semibold">Patliputra Colony · 4.3</div><div className="text-xs opacity-60 mt-1">Great for visitors — Midtown suburban, P&M Mall, Sai temple</div></div>
                <div className="bg-white rounded-xl p-4 border border-black/10"><div className="font-semibold">Transit & Airports</div><div className="text-xs opacity-60 mt-1">PAT 13 min · 5.2 mi · Gaya 68.9 mi · Station 6 min</div></div>
              </div>
              <a href="https://www.google.com/maps/place/HOTEL+CROWN+PATLI/@25.6242306,85.1119586,17z" target="_blank" className="inline-flex mt-4 rounded-full px-6 py-3 text-xs font-bold tracking-[0.12em] border hover:bg-[#3A0E18] hover:text-white transition" style={{ borderColor: BURGUNDY, color: BURGUNDY }}>OPEN IN GOOGLE MAPS — Directions</a>
            </div>
            <Reveal delay={1} scale className="rounded-2xl overflow-hidden border border-black/10 h-[360px] bg-white"><iframe title="Hotel Crown Patliputra Map" src="https://maps.google.com/maps?q=25.6242306,85.1119586&z=17&output=embed" className="w-full h-full border-0" loading="lazy" /></Reveal>
          </div>
        </Reveal>
      </section>

      <footer id="contact" className="bg-[#0D0708] border-t border-white/10">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div><div className="font-bold tracking-[0.12em]">HOTEL CROWN PATLIPUTRA</div><div className="text-xs opacity-60 mt-1">होटल क्राउन पाटलिपुत्र · A Unit of RAV Hospitality</div><div className="text-xs opacity-70 mt-3 leading-5">4A Vivekanand Park Rd, Patna 800013 · J4F6+MQ<br/>Check-in 12:00 pm · Check-out 11:00 am</div></div>
            <div><div className="font-semibold">Contact</div><div className="opacity-70 mt-2 text-xs leading-6"><a href="tel:08252134696" className="underline">082521 34696</a> · Tap to call<br/>Plus Code: J4F6+MQ<br/>Maps history · Add label · Add website TBD</div></div>
            <div><div className="font-semibold">Amenities</div><ul className="opacity-70 mt-2 text-xs space-y-1"><li>Free Wi-Fi · Free parking</li><li>Paid breakfast · Air-conditioned</li><li>Accessible · LGBTQ+ friendly</li><li>24h reception · Luggage storage</li></ul></div>
            <div>            <div className="font-semibold">Direct Booking</div><p className="opacity-60 text-xs mt-2">MakeMyTrip ₹1,294 · Agoda ₹1,319 · More from ₹1,311. Call for best rate.</p><a href="/booking" className="mt-3 inline-block rounded-full px-6 py-2.5 text-xs font-bold tracking-[0.12em] text-white" style={{ background: GOLD, color: "#1A0A0E" }}>GO TO BOOKING PAGE</a></div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2 text-xs opacity-50"><span>© 2026 Hotel Crown Patliputra · 4.7 ★ (69)</span><span>25.6242306,85.1119586 · goo.gl/VhuLeS2sr3eya11a7 · PRD v1.0</span></div>
        </div>
      </footer>
      {showToast && <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#F5F0E8] text-[#1A0A0E] px-6 py-3 rounded-full shadow-2xl text-sm font-medium border border-black/10 max-w-[92vw] text-center">{showToast}</div>}
    </div>
  );
}
