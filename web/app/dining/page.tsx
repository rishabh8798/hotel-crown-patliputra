import Link from "next/link";
export default function Dining() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1A0A0E] p-8 max-w-3xl">
      <Link href="/" className="text-sm underline">← Back to Home</Link>
      <h1 className="font-serif text-3xl mt-6">Spice Restaurant & Rooftop Bar</h1>
      <p className="mt-2 text-sm opacity-70">Indian & international cuisine — rooftop bar with Patna views. Menu TBD - Verify with Hotel. See homepage #rooms pill: Gourmet Dining.</p>
    </div>
  );
}
