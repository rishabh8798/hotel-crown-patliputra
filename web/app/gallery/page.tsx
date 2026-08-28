import Image from "next/image";
import Link from "next/link";
export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#0D0708] text-[#F5F0E8] p-8">
      <Link href="/" className="text-sm underline opacity-70">← Back to Home</Link>
      <h1 className="font-serif text-3xl mt-6">Gallery</h1>
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="relative h-64 rounded-xl overflow-hidden"><Image src="/hotel-1.png" alt="Exterior" fill className="object-cover"/></div>
        <div className="relative h-64 rounded-xl overflow-hidden"><Image src="/hotel-2.png" alt="Reception" fill className="object-cover"/></div>
        <div className="relative h-64 rounded-xl overflow-hidden"><Image src="/hotel-3.png" alt="Room" fill className="object-cover"/></div>
        <div className="relative h-64 rounded-xl overflow-hidden"><Image src="/hero.jpg" alt="Hero" fill className="object-cover"/></div>
      </div>
    </div>
  );
}
