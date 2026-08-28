"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";

const BURGUNDY = "#3A0E18";
const GOLD = "#C9A86A";

const ROOMS = [
  { id: "deluxe", name: "Deluxe Double Room", base: 1319, agoda: 1319, mmt: 1294, desc: "Clean, spacious · AC · TV · Kettle · City view" },
  { id: "family", name: "Family Room", base: 1599, agoda: 1599, mmt: 1540, desc: "Comfortable · 16 sq · 2-3 Guests" },
  { id: "executive", name: "Executive Suite", base: 1999, agoda: 1999, mmt: 1920, desc: "Banquet access · Spacious · Good housekeeping" },
];

function CustomSelect({ value, onChange, options }: { value: string | number; onChange: (v: string | number) => void; options: { value: string | number; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const label = options.find((o) => String(o.value) === String(value))?.label || String(value);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between rounded-xl border-2 border-black/10 bg-white px-3 py-3 pr-3 text-sm font-bold text-[#1A0A0E] hover:border-[#C9A86A]/40 focus:border-[#C9A86A] focus:ring-2 focus:ring-[#C9A86A]/20 shadow-sm">
        <span>{label}</span><span className={`text-[#3A0E18] transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-20 rounded-xl border-2 border-[#C9A86A]/20 bg-white shadow-2xl overflow-hidden max-h-[220px] overflow-y-auto">
          {options.map((o) => (
            <button key={String(o.value)} type="button" onClick={() => { onChange(o.value); setOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm font-bold hover:bg-[#F5F0E8] ${String(o.value)===String(value) ? "bg-[#3A0E18] text-white hover:bg-[#3A0E18]" : "text-[#1A0A0E]"}`}>{o.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Booking() {
  const [splash, setSplash] = useState(true);
  const [splashExit, setSplashExit] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setSplashExit(true), 1500);
    const t2 = setTimeout(() => setSplash(false), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const [roomId, setRoomId] = useState("deluxe");
  const [checkIn, setCheckIn] = useState("2026-08-28");
  const [checkOut, setCheckOut] = useState("2026-08-29");
  const [guests, setGuests] = useState(2);
  const [customGuests, setCustomGuests] = useState(12);
  const effectiveGuests = guests === 11 ? customGuests : guests;
  const [breakfast, setBreakfast] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const room = ROOMS.find((r) => r.id === roomId)!;
  const nights = useMemo(() => {
    const a = new Date(checkIn).getTime();
    const b = new Date(checkOut).getTime();
    const d = Math.round((b - a) / 86400000);
    return d > 0 ? d : 1;
  }, [checkIn, checkOut]);
  const total = room.base * nights + (breakfast ? 150 * effectiveGuests * nights : 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) { setToast("Enter name & phone (082521 34696 for help)"); setTimeout(() => setToast(null), 3000); return; }
    setToast(`Booked ${room.name} · ${checkIn} → ${checkOut} · ${effectiveGuests} guests · ${nights} night(s) · Total ₹${total} · 082521 34696`);
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {splash && (
        <div className={`fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[#0D0708] text-[#F5F0E8] ${splashExit ? "splash-exit" : ""}`}>
          <div className="absolute inset-0 bg-mocha opacity-90" />
          <div className="relative flex flex-col items-center">
            <div className="h-[64px] w-[80px] rounded-[14px] border flex flex-col items-center justify-center gap-1 shadow-[0_0_40px_rgba(201,168,106,0.3)]" style={{ borderColor: GOLD, background: "rgba(255,255,255,0.04)", animation: "crownPulse 1.2s ease infinite" }}>
              <span style={{ color: GOLD }} className="text-[20px] leading-none">♔</span>
              <span className="text-[12px] font-bold tracking-[0.22em]" style={{ color: GOLD }}>HCP</span>
            </div>
            <div className="mt-4 font-serif text-lg tracking-[0.16em] font-semibold">BOOKING</div>
            <div className="text-xs tracking-[0.18em] opacity-60">HOTEL CROWN PATLIPUTRA · 4.7 ★ (69)</div>
            <div className="mt-6 w-[180px] h-[3px] rounded-full bg-white/10 overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ background: `linear-gradient(90deg, ${GOLD}, #E8C99A)`, animation: "fill 1.4s ease forwards" }} />
            </div>
          </div>
        </div>
      )}
      {/* FULL PAGE BACKGROUND IMAGE */}
      <div className="fixed inset-0 -z-10">
        <Image src="/booking-room.jpg" alt="Booking background room" fill priority className="object-cover object-center" />
        {/* overlays to keep text legible on top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
        <div className="absolute inset-0 bg-[#0D0708]/20 backdrop-blur-[0.5px]" />
      </div>

      <header className="sticky top-0 z-20 backdrop-blur-xl bg-black/25 border-b border-white/10 text-white">
        <div className="mx-auto max-w-[1080px] flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded border flex items-center justify-center text-[10px] font-bold" style={{ borderColor: GOLD, color: GOLD, background: "rgba(255,255,255,0.08)" }}>HCP</div>
            <span className="text-xs tracking-[0.14em] font-bold">HOTEL CROWN PATLIPUTRA</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs opacity-80"><span>4.7 ★ (69)</span><span>·</span><span>J4F6+MQ</span></div>
          <a href="tel:08252134696" className="rounded-full px-5 py-2 text-xs font-bold backdrop-blur" style={{ background: GOLD, color: "#1A0A0E" }}>Call 082521 34696</a>
        </div>
      </header>

      {/* ALL ELEMENTS ON TOP OF BACKGROUND */}
      <div className="relative z-10 mx-auto max-w-[1080px] px-4 sm:px-6 py-6 lg:py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-white bg-black/30 backdrop-blur px-3 py-1.5 rounded-full border border-white/20 book-in-down" style={{ animationDelay: "2.2s" }}>← Back to Home</Link>

        <div className="mt-4 text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs border border-white/20 book-in-down" style={{ animationDelay: "2.3s" }}>4.7 ★ (69) · होटल क्राउन पाटलिपुत्र · LGBTQ+ friendly</div>
          <h1 className="font-serif text-3xl sm:text-4xl mt-3 book-in-up" style={{ animationDelay: "2.4s" }}>Book Your Stay — On Your Room View</h1>
          <p className="text-sm opacity-80 mt-1 max-w-2xl mx-auto book-in-up" style={{ animationDelay: "2.5s" }}>Every card floats on top of your booking room image. 4.7 rated — clean, spacious, comfortable · Check-in 12pm · Check-out 11am · 082521 34696</p>
        </div>

        {/* Room switcher — on top */}
        <div className="mt-6 flex gap-2 justify-center flex-wrap book-in-up" style={{ animationDelay: "2.6s" }}>
          {ROOMS.map((r) => (
            <button key={r.id} onClick={() => setRoomId(r.id)} className={`rounded-full px-5 py-2.5 text-xs font-bold border backdrop-blur-xl transition ${roomId === r.id ? "bg-white text-[#1A0A0E] border-white shadow-xl" : "bg-white/15 text-white border-white/30 hover:bg-white/25"}`}>{r.name} · ₹{r.base}</button>
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          {/* Form card — from left */}
          <form onSubmit={submit} className="space-y-4 book-in-left" style={{ animationDelay: "2.7s" }}>
            <div className="rounded-2xl bg-white backdrop-blur-xl border border-black/10 shadow-2xl p-5 space-y-4 text-[#1A0A0E]">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold tracking-[0.14em] text-[#1A0A0E]">STAY DETAILS — {room.name}</div>
                <span className="text-xs bg-[#3A0E18] text-white px-2 py-1 rounded-full">₹{room.base} / night</span>
              </div>
              <p className="text-xs text-[#1A0A0E]/70">{room.desc} · 4.7 ★ (69) guests love spacious comfort</p>
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1"><span className="text-xs font-semibold text-[#1A0A0E]">Check-in</span><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full rounded-xl border border-black/15 px-3 py-3 text-sm outline-none bg-white text-[#1A0A0E]" /></label>
                <label className="space-y-1"><span className="text-xs font-semibold text-[#1A0A0E]">Check-out</span><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full rounded-xl border border-black/15 px-3 py-3 text-sm outline-none bg-white text-[#1A0A0E]" /></label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1"><span className="text-xs font-extrabold tracking-[0.08em] text-[#1A0A0E]">Guests</span><CustomSelect value={guests} onChange={(v)=> setGuests(Number(v))} options={[...[1,2,3,4,5,6,7,8,9,10].map(n=> ({ value: n, label: `${n} ${n===1?'Guest':'Guests'}` })), { value: 11, label: '10+ Guests — custom' }]} /></label>
                <label className="space-y-1"><span className="text-xs font-extrabold tracking-[0.08em] text-[#1A0A0E]">Room</span><CustomSelect value={roomId} onChange={(v)=> setRoomId(String(v))} options={ROOMS.map(r=> ({ value: r.id, label: r.name }))} /></label>
              </div>
              {guests===11 && (
                <label className="space-y-1"><span className="text-xs font-semibold text-[#1A0A0E]">No. of guests (10+)</span><input type="number" min={11} max={50} value={customGuests} onChange={(e)=> setCustomGuests(Math.max(11, Number(e.target.value)||11))} placeholder="Enter number e.g. 12" className="w-full rounded-xl border border-black/15 px-3 py-3 text-sm bg-white text-[#1A0A0E]" /></label>
              )}
              <label className="flex items-center gap-2 text-sm bg-[#F5F0E8] rounded-xl px-3 py-3 border border-black/10 text-[#1A0A0E]"><input type="checkbox" checked={breakfast} onChange={(e) => setBreakfast(e.target.checked)} /> Paid breakfast (+₹150 × {effectiveGuests} guests × nights)</label>
              <div className="grid gap-3">
                <input placeholder="Full name *" value={name} onChange={(e) => setName(e.target.value)} required className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none bg-white text-[#1A0A0E] placeholder:text-black/50" />
                <input placeholder="Phone *  (08252134696)" value={phone} onChange={(e) => setPhone(e.target.value)} required className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none bg-white text-[#1A0A0E] placeholder:text-black/50" />
              </div>
            </div>

            <div className="rounded-2xl bg-white backdrop-blur-xl border border-black/10 shadow-2xl p-5 text-[#1A0A0E] book-in-up" style={{ animationDelay: "2.95s" }}>
              <div className="text-xs font-bold tracking-[0.14em] text-[#1A0A0E]">PRICE BREAKDOWN</div>
              <div className="mt-3 space-y-2 text-sm text-[#1A0A0E]">
                <div className="flex justify-between"><span>Room ({nights} × ₹{room.base})</span><span className="font-semibold">₹{room.base * nights}</span></div>
                {breakfast && <div className="flex justify-between"><span>Breakfast ({effectiveGuests} × {nights} × ₹150)</span><span>₹{150 * effectiveGuests * nights}</span></div>}
                <div className="flex justify-between text-black/60"><span>Taxes & fees (TBD)</span><span>—</span></div>
                <div className="mt-3 pt-3 border-t border-black/10 flex justify-between font-bold text-base">Total <span>₹{total}</span></div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-center text-[#1A0A0E]">
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2"><div className="font-bold">MakeMyTrip</div><div>₹{room.mmt}</div></div>
                <div className="rounded-xl bg-white border border-black/10 p-2"><div className="font-bold">Agoda</div><div>₹{room.agoda}</div></div>
                <div className="rounded-xl border-2 p-2 bg-[#FFF7ED]" style={{ borderColor: BURGUNDY }}><div className="font-bold" style={{ color: BURGUNDY }}>Direct</div><div>₹{room.base}</div></div>
              </div>
              <button type="submit" className="mt-4 w-full rounded-full py-4 text-sm font-bold tracking-[0.12em] text-white shadow-lg" style={{ background: BURGUNDY }}>CONFIRM BOOKING</button>
              <a href="tel:08252134696" className="mt-2 block text-center rounded-full py-3 text-sm font-bold border bg-white" style={{ borderColor: BURGUNDY, color: BURGUNDY }}>Call 082521 34696 to book directly</a>
            </div>
          </form>

          {/* Info cards — from right */}
          <div className="space-y-4 lg:sticky lg:top-[84px] book-in-right" style={{ animationDelay: "2.8s" }}>
            <div className="rounded-2xl bg-white backdrop-blur-xl border border-black/10 shadow-2xl p-5 text-[#1A0A0E]">
              <div className="text-xs font-bold tracking-[0.14em] text-[#1A0A0E]">WHY BOOK DIRECT</div>
              <ul className="mt-3 text-sm space-y-2 text-[#1A0A0E]/80 list-disc pl-5">
                <li>4.7 ★ (69) — clean, spacious, comfortable + good food</li>
                <li>Excellent service, helpful staff, good housekeeping</li>
                <li>Affordable — good value vs more from ₹1,311</li>
                <li>Free Wi-Fi · Free parking · Air-conditioned · Accessible</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[#0D0708]/70 backdrop-blur-xl border border-white/20 shadow-2xl p-5 text-white">
              <div className="text-xs tracking-[0.14em] font-bold opacity-60">HOTEL CROWN PATLIPUTRA</div>
              <div className="text-sm mt-2 leading-6">होटल क्राउन पाटलिपुत्र<br/>4 A, 1, Vivekanand Park Rd, Patna 800013<br/>J4F6+MQ · Check-in 12pm · Check-out 11am<br/>LGBTQ+ friendly</div>
              <a href="https://www.google.com/maps/place/HOTEL+CROWN+PATLI/@25.6242306,85.1119586,17z" target="_blank" className="mt-3 inline-block rounded-full bg-white text-[#1A0A0E] px-5 py-2 text-xs font-bold">Open in Google Maps</a>
            </div>

          </div>
        </div>
      </div>
      {toast && <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#1A0A0E] text-white px-6 py-3 rounded-full shadow-2xl text-sm max-w-[92vw] text-center border border-white/20">{toast}</div>}
    </div>
  );
}
