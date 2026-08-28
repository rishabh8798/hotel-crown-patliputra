import Link from "next/link";
export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1A0A0E] p-8 max-w-2xl">
      <Link href="/" className="text-sm underline">← Back to Home</Link>
      <h1 className="font-serif text-3xl mt-6">Contact — Hotel Crown Patliputra</h1>
      <p className="mt-3 text-sm leading-6 opacity-80">4 A, 1, Vivekanand Park Rd, Road No-01, Patliputra Colony, Patna 800013<br/>Opposite Alpana Market & Cafe Coffee Day<br/>Coords: 25.6242306,85.1119586<br/>Phone/WhatsApp: TBD - Verify with Hotel</p>
      <a href="https://www.google.com/maps/place/HOTEL+CROWN+PATLI/@25.6242306,85.1119586,17z" target="_blank" className="inline-block mt-6 rounded-full bg-[#3A0E18] text-white px-6 py-3 text-xs font-bold tracking-[0.12em]">OPEN IN GOOGLE MAPS</a>
    </div>
  );
}
