import Link from "next/link";
export default function Banquet() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1A0A0E] p-8 max-w-3xl">
      <Link href="/" className="text-sm underline">← Back to Home</Link>
      <h1 className="font-serif text-3xl mt-6">Banquet & Conference</h1>
      <p className="mt-2 text-sm opacity-70">20,000 sq ft · Up to 1,200 guests · TBD - Verify with Hotel. See homepage #banquet for enquiry form.</p>
      <ul className="list-disc pl-5 mt-4 text-sm opacity-80">
        <li>Central Patliputra location, free parking, Spice catering</li>
        <li>Enquiry: Name/Phone/Date/Guests → stored as BanquetLead</li>
      </ul>
    </div>
  );
}
