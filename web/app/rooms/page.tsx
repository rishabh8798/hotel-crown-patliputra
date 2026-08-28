import Link from "next/link";
import Image from "next/image";
export default function Rooms() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1A0A0E] p-8">
      <Link href="/" className="text-sm underline">← Back to Home</Link>
      <h1 className="font-serif text-3xl mt-6">Rooms & Suites — TBD Pricing</h1>
      <p className="opacity-70 mt-2 text-sm">Deluxe Double (13sq) & Family Room (16sq) from INR 2,999* — full details on homepage #rooms. Rates TBD - Verify with Hotel.</p>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="relative h-56 bg-white rounded-xl overflow-hidden border"><Image src="/hotel-3.png" alt="Deluxe" fill className="object-cover" /></div>
        <div className="relative h-56 bg-white rounded-xl overflow-hidden border"><Image src="/hotel-1.png" alt="Family" fill className="object-cover" /></div>
        <div className="relative h-56 bg-white rounded-xl overflow-hidden border"><Image src="/hotel-2.png" alt="Suite" fill className="object-cover" /></div>
      </div>
    </div>
  );
}
