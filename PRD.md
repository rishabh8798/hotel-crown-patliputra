# PRD: Hotel Crown Patliputra — Website + Booking Engine + Banquet

| Field | Value |
|-------|-------|
| **Hotel** | HOTEL CROWN PATLIPUTRA — A Unit of RAV Hospitality & Services |
| **Source** | Google Maps: `https://maps.app.goo.gl/VhuLeS2sr3eya11a7` → `25.6242306,85.1119586` |
| **Address** | 4 A, 1, Vivekanand Park Rd, Road No-01, Patliputra Colony, Patna 800013, Bihar |
| **Version** | 1.0 — Full Depth |
| **Date** | 2026-08-26 |
| **Stack** | Next.js 14 (App Router) + Tailwind CSS + Prisma/Postgres + NextAuth + Razorpay |
| **Design Ref** | `pics/hero page.jpeg` = Background Helper, `pics/HOTEL 1.png` / `2.png` / `3.png` = Brand assets. Opulence Grand layout (provided screenshot) = Front Page Template |
| **Audience** | Both — Business/Corporate + Family/Leisure/Transit |
| **Scope** | Marketing Website + Direct Booking Engine + Banquet/Conference Enquiry |

---

## 1. Executive Summary

Build a premium, mobile-first Next.js website for **Hotel Crown Patliputra** that drives **direct bookings** and **banquet leads** for a central Patna business hotel. The site must replicate the **Opulence Grand front-page structure** (luxury hero + 3 pillars + suite cards + testimonials) but re-skinned with **Hotel Crown Patliputra’s actual facade as the hero background helper** and Burgundy/Gold brand system.

**Positioning:** 3.5–4★ Business + Banquet hotel near Bihar Museum, 5 km from Jay Prakash Narayan Airport (PAT), 2.2 mi from Patna Railway Station. Competing in Patliputra/Boring Road cluster (overlap with Hotel O The Grand Patliputra at same pin — flag as TBD rebrand).

**Success Criteria:**
- 40%+ direct bookings vs OTA (Booking.com) within 6 months
- 25–30 banquet enquiries / month
- Lighthouse >90, LCP <2.2s, SEO Top 3 for `hotel in patliputra / hotel near bihar museum / hotel near patna airport`

---

## 2. Goals & Metrics

| Goal | KPI | Target |
|------|-----|--------|
| Direct Revenue | Booking conversion | >2.5% |
| Banquet Revenue | Qualified leads | 30/mo, 15% close |
| Discoverability | Organic clicks | +80% in 90 days |
| Trust | Avg rating display, reviews | 6.0/10 → 7.5/10 via fresh reviews |
| Retention | Repeat direct | 18% |

Analytics: GA4 + Search Console + Meta Pixel. Track `view_room → select_dates → initiate_checkout → payment_success → banquet_enquiry`.

---

## 3. Source of Truth & Verified Data

| Attribute | Value | Status | Source |
|-----------|-------|--------|--------|
| Name | HOTEL CROWN PATLIPUTRA | Verified | `pics/HOTEL 1.png:1`, `hero page.jpeg:1`, Maps 302 redirect |
| Coords | 25.6242306, 85.1119586 | Verified | Maps `maps/place/HOTEL+CROWN+PATLIPUTRA` |
| Street | 4 A,1 Vivekanand Park Rd, Rd No-01, opposite Cafe Coffee Day/Alpana Market | Verified | Airport-hotel.com + worldorgs |
| Airport | PAT 5.2 mi / 13 min | Verified | Airport-hotel.com |
| Check-in/out | 12:00–23:00 / until 11:00 | Verified | Airport-hotel.com |
| Breakfast | INR 150 pp | Verified | Airport-hotel.com |
| Rooms | Deluxe Double (13sq, 2p, 1 Double, AC/Bath, TV/Kettle), Family Room (16sq, 2p) | Partially Verified | Airport-hotel.com |
| Room Count | 110 (marketing copy) vs 10 (property info) | **TBD - Verify with Hotel** | Contradiction |
| Banquet | 20,000 sq ft / 1,200 guests | **TBD** | Marketing copy only |
| Dining | Restaurant `Spice` (Indian/Intl) + Rooftop Bar | **TBD** | Marketing copy |
| Wellness | Spa + Fitness + Sun Terrace | **TBD** | Contradiction: travelmyth says No gym/spa |
| Parking/WiFi/Shuttle/Laundry | Yes (Paid shuttle, Free WiFi/parking, Luggage, 24h reception) | Verified | Facilities list |
| Pets/Smoking | No pets, No smoking | Verified | Facilities list |
| Exterior | Brown/gold facade, jali panels, glass, gold railings | Verified | `pics/hero page.jpeg:1` |
| Reception | HCP gold crown on burgundy wall, marble desk | Verified | `pics/HOTEL 2.png:1` |
| Room Interior | Twin beds, teal headboard, beige curtains, towel fold | Verified | `pics/HOTEL 3.png:1` |
| Rating | 6.0/10 (48 reviews Booking.com), 10.0/1 verified | Verified | Airport-hotel.com |
| Price Example | $450/night (Opulence Grand placeholder) | **TBD - Replace with INR** | Screenshot ref - NOT actual |

**Rule:** All `TBD` must render as `TBD - Verify with Hotel` in UI/CMS and not block launch.

---

## 4. Personas (Both)

**P1: Corporate Traveler (Arjun, 34)** — Needs: Fast booking, near station/airport, 24h check-in, laundry, business centre, GST invoice. Pain: OTA markup, no direct support.
**P2: Event Planner (Priya, 29)** — Needs: Banquet capacity, floor plan, catering, site visit slot, price per plate. Books 50–300 pax weddings/corporate.
**P3: Family Tourist (Ramesh, 42)** — Needs: Clean family room, Bihar Museum/Gol Ghar proximity, breakfast, parking, safe area. Sensitive to reviews/photos.
**P4: Transit/NRI (Sana, 27)** — Needs: Airport shuttle, late check-in, English/Hindi UI, WhatsApp confirmation.

---

## 5. Design Mandate — Background Helper + Front Page Template

### 5.1 Background Helper (Mandatory)
- Use `C:\Users\Rishabh\Desktop\CROWN\pics\hero page.jpeg` as **hero background** for `/` and `/rooms`.
- Treatment: Full-bleed facade, bottom 40% dark burgundy gradient for text legibility, top sky retains **large translucent `CROWN` lettering** (as in helper image: white, 600wt, 15% opacity, letter-spacing 0.25em, blur-glow). Do NOT crop the signage `HOTEL CROWN PATLIPUTRA — A Unit of RAV Hospitality & Services`.
- Preload hero image, `priority` in Next.js Image, WebP 1920w + 768w srcset, overlay `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(40,5,15,0.82) 100%)`.

### 5.2 Front Page Must Look Like Opulence Grand Screenshot (Provided)
Replicate structure 1:1, rebranded:

```
[Header: HCP Crown Logo | Nav: Rooms Dining Banquet Gallery Location Contact | CTA: Book Your Stay ]
[Hero - Background Helper]
  Center: Crest (HCP crown shield replacing OG) → "HOTEL CROWN PATLIPUTRA" / "A Unit of RAV Hospitality" /
           H1 "Experience Pure Comfort" (replace Luxury to fit 3★ business positioning; alt: "Experience Heart of Patna")
           Sub: NOT "Crafting exceptional coffee..." → Replace with: "Central Patna stay with banquet grandeur, rooftop views and warm Bihari hospitality."
           CTA Pill: "BOOK YOUR STAY" (gold outline, burgundy fill on hover)
  Below-fold curve divider (thin gold line as in Opulence Grand - keep)

[3 Pillars - Icons row with dividers]
  Five-Star Service* → "Trusted Hospitality" / "Personalized, world-class service" (replace 5-star to avoid mis-rating; keep crown icon)
  Elegant Suites   → "Elegant Rooms" / "Luxurious rooms designed for your comfort" (sofa icon)
  Gourmet Dining   → "Spice Restaurant" / "Indian & international cuisine with rooftop views" (cloche icon)
  *Keep 5 stars visual but link to actual 6.0/10 rating with "Rated 6.0 by guests" disclaimer

[Suite Cards Grid 3-col]
  Card: Image (use pics/HOTEL 3.png + 2 additional room renders) | Title | "From INR TBD / night" (NOT $450) | ★★★★☆
    - Deluxe Double Room
    - Family Room
    - Executive / Banquet Suite (placeholder - TBD)
  CTA: "VIEW ALL SUITES" → "View All Rooms" (gold solid pill #C9A86A, burgundy text)

[Trust Bar]
  Icons: "Patna's Choice" + "Comfort" (replace luxury/comfort icons; keep minimalist line style)

[Testimonials 2-col rounded cards - keep shape]
  "An unforgettable stay in unparalleled comfort." — keep slider with Google/Booking.com source attribution
  "The epitome of elegance and service."

[Footer: Address, Map, Contact +91 TBD, Check-in/out, Social, GST, Book Now sticky]
```

**Do NOT copy** Opulence Grand text verbatim (`Opulence Grand`, `A World of Unparalleled Luxury`, `Crafting exceptional coffee...`, `$450`). All must be rewritten for Crown Patliputra.

### 5.3 Brand System
- Palette: Burgundy `#4A0F1A` (primary), Gold `#C9A86A` (accent/CTA), Cream `#F5F0E8` (card bg), Charcoal `#1A1A1A` (text), Teal `#0E3A3E` (from reception wall bottom - alt)
- Type: Serif Display for H1 (Playfair / Cormorant) + Sans for body (Inter/Poppins). Hero `CROWN` giant text: stretch 900, opacity 0.12.
- Texture: Dark mocha textured background (`#2B1A14` with subtle grain) as in Opulence Grand — keep for heritage luxury feel but lighter at 85% to let facade breathe.
- Iconography: Thin gold line icons (crown, sofa, cloche) — stroke 1.5px.

---

## 6. Information Architecture & Routes

```
/                          Home (Opulence structure + Helper hero)
/rooms                     Grid + filters (guests, AC, bath)
/rooms/[slug]              Deluxe Double, Family, Executive (TBD) - gallery, amenities, book widget
/dining                    Spice Restaurant + Rooftop Bar - menu PDF TBD
/banquet                   USPs (20k sq ft TBD), Gallery, Packages, Enquiry form + floor plan download
/gallery                   Exterior / Reception / Rooms / Banquet / Dining
/location                  GMap embed (25.6242306,85.1119586), Nearby (Bihar Museum 25min walk, P&M Mall 15min, Golghar 30min, Airport 13min)
/contact                   Form + WhatsApp + Phone TBD + 4A Vivekanand Park Rd address
/booking                   Checkout (dates → guests → add-ons → payment → confirmation)
/admin                     CMS: Rooms, Rates, Bookings, Banquet Leads, Reviews, Media
/api/availability          Check dates/rooms
/api/banquet-lead          POST
```

Next.js: `app/(site)/...` + `app/(admin)/...` . SEO: `sitemap.xml`, `robots.txt`, JSON-LD `Hotel`, `LodgingBusiness`.

---

## 7. Functional Requirements (MoSCoW)

**Must (P0)**
- FR-01 Hero as Background Helper (5.1) with responsive `next/image` and overlay text per 5.2
- FR-02 Opulence pillar + suite card layout pixel-matched (3 pillars, 3 cards, VIEW ALL CTA)
- FR-03 Room listing from CMS (title, sqft, occupancy, bed, amenities chips: AC, TV, Kettle, Bath)
- FR-04 Availability search: Calendar (check-in/out), guests, rooms — disable past dates, enforce checkout > check-in, max TBD
- FR-05 Direct booking: Price per night (INR TBD), breakfast toggle (+150 pp), taxes/fees, total; proceed to Razorpay/UPI
- FR-06 Banquet enquiry: Form (name, phone, email, event type, date, guests 20–1200, message) → DB + email/WhatsApp to hotel
- FR-07 Gallery lightbox, Location GMap with pin + nearby tiles
- FR-08 Contact + footer with check-in/out, parking/WiFi status, phone TBD (link `tel:` + WhatsApp)
- FR-09 Admin CRUD for rooms/rates/images/leads with auth
- FR-10 SEO: meta title/desc per page, OG image (hero), schema, Hindi/English toggle (en-IN primary)

**Should (P1)**
- FR-11 Reviews carousel (pull Booking.com 6.0/10 with attribution + allow UGC submission moderation)
- FR-12 Promo bar "Book Direct & Save up to 10% vs Booking.com"
- FR-13 Sticky mobile Book Bar
- FR-14 Email confirmations (Resend/SES) + PDF voucher
- FR-15 Banquet package table (Veg/Non-veg per plate TBD)

**Could (P2)**
- FR-16 Channel manager sync (MakeMyTrip/Goibibo) — stub API
- FR-17 Loyalty / GST invoice field
- FR-18 Blog/Offers (must-do experiences: Golghar, Litti Chokha, Bihar Museum)

**Won't (v1)**
- Pool/Spa booking (marked TBD), Dog-friendly, Multi-property

---

## 8. Booking Engine Spec

- **Calendar:** `react-day-picker` or `antd DatePicker`. Default 26–27 Aug placeholder. Block past + check-in 12:00 logic (allow same-day if before 21:00).
- **Inventory:** Simple count per room type (TBD initial: 5 Deluxe, 3 Family, 2 Suite). No overbooking; decrement on payment success, hold 15min on initiate.
- **Pricing:** `baseRate` per room/night (INR TBD). Extra: breakfast 150*guests*nights, shuttle paid TBD. Coupon `DIRECT10`.
- **Payment:** Razorpay Checkout (UPI, Card). Webhook → `booking.status = CONFIRMED`. Fallback: Pay at Hotel (holds).
- **Confirmation:** `/booking/success?bookingId` + WhatsApp deep link `wa.me/91TBD?text=Booking%20...`.
- **Policy copy:** Free cancellation TBD, No pets, No smoking — from facilities.

---

## 9. Banquet Spec

- Hero stat: `20,000 sq ft · Up to 1,200 guests` with `TBD` badge + disclaimer "Verify capacity with hotel".
- Sections: Why Crown Patliputra (central, parking, catering), Hall configurations (Theatre/Banquet/Cluster), Amenities (stage, AV, decor), Catering (Spice), Gallery.
- **Lead Form Fields:** Name*, Phone* (10-digit India), Email, Event Type (Wedding/Corporate/Birthday/Other), Date*, Guests*, Budget TBD, Message. Validation + spam honeypot + reCAPTCHA.
- **Admin:** Table leads, status (New/Contacted/Site Visit/Booked/Lost), notes, export CSV.

---

## 10. Data Model (Prisma)

```prisma
model Room {
  id          String @id @default(cuid())
  slug        String @unique
  title       String   // "Deluxe Double Room"
  sqft        Int?     // 13 - TBD verify
  occupancy   Int      // 2
  bed         String   // "1 Double"
  amenity     String[] // ["AC","Bath","TV","Kettle"]
  baseRate    Int      // INR per night, TBD
  count       Int      // inventory
  images      String[] // /pics/HOTEL 3.png etc
  featured    Boolean
}
model Booking {
  id          String @id @default(cuid())
  roomId      String
  checkIn     DateTime
  checkOut    DateTime
  guests      Int
  nights      Int
  breakfast   Boolean
  total       Int
  status      String // HOLD, CONFIRMED, CANCELLED
  phone       String
  email       String?
  name        String
  razorpayId  String?
}
model BanquetLead {
  id        String @id @default(cuid())
  name      String
  phone     String
  email     String?
  eventType String
  date      DateTime
  guests    Int
  message   String?
  status    String @default("NEW")
  createdAt DateTime @default(now())
}
```

Seed: 2 rooms from verified data, rates `TBD - 2999` placeholder to be replaced.

---

## 11. Non-Functional

- Performance: LCP <2.2s on 4G, hero WebP <250KB, lazy gallery.
- Security: NextAuth admin, Prisma parameterized, Razorpay webhook signature, rate limit booking POST 5/min/IP.
- Accessibility: WCAG AA, 4.5:1 contrast (gold on burgundy meets on large text only; body on cream).
- SEO: Canonical, hreflang en-IN, `Hotel` + `EventVenue` schema with `geo: 25.6242306,85.1119586`, address `4A Vivekanand Park Rd`.
- Compliance: GST, PAN, privacy, cookie consent.

---

## 12. Content Matrix (Rewrite — Do Not Copy Opulence)

| Section | Opulence Original (DO NOT USE) | Crown Replacement |
|---------|-------------------------------|-------------------|
| H1 | Experience Pure Luxury | Experience Heart of Patna / Stay Central, Celebrate Grand |
| Sub | Crafting exceptional coffee... | "Stay central, celebrate grand — rooms & banquets in the heart of Patliputra." |
| Pillars sub | Personalized... / Luxurious... / Exquisite... | Keep structure but rewrite for 4★: "Warm, attentive service" etc. |
| Prices | From $450 / night | From INR 2,999* / night `*TBD` |

---

## 13. Risks & TBD Log

- **R1:** Room count 10 vs 110 → UI shows "10+ rooms available — full inventory TBD"
- **R2:** Gym/Spa contradictory → Hide until verified; show Sun Terrace/Leisure only if confirmed
- **R3:** $450 placeholder → Replace before launch; hard fail build if price missing
- **R4:** Same address as O The Grand Patliputra → Clarify brand lineage to avoid duplicate GMB
- **R5:** Google Maps JS scrape blocked → Use static embed + coords; Places API only if key provided

---

## 14. Roadmap

**Phase 1 (2 weeks):** Home (Helper + Opulence layout), Rooms, Gallery, Location, CMS seed, static Banquet
**Phase 2 (2 weeks):** Booking engine + Razorpay + Admin + Email/WhatsApp
**Phase 3 (1 week):** Banquet CRM, Reviews import, SEO hardening, perf audit

---

## 15. Acceptance Criteria

- Home visually matches Opulence Grand layout when side-by-side (pillars 3-col, cards 3-col, CTA pill, dark mocha texture) but hero background is clearly `hero page.jpeg` with translucent `CROWN` giant text.
- `pics/HOTEL 1.png` signage legible in hero bottom; HCP crown icon extracted as favicon/logo.
- Booking flow E2E in test mode; Banquet lead creates row + sends email.
- No `TBD` renders as raw; all show `TBD - Verify with Hotel` badge.
- Lighthouse mobile >90, no CLS on hero.

---

## 16. Appendix

- Maps: 302 `https://www.google.com/maps/place/HOTEL+CROWN+PATLI.../@25.6242306,85.1119586`
- Assets: `C:\Users\Rishabh\Desktop\CROWN\pics\hero page.jpeg`, `HOTEL 1.png`, `HOTEL 2.png`, `HOTEL 3.png`
- Refs: `airport-hotel.com/hotel/crownpatliputra` (6.0/10, facilities), `worldorgs.com` (reviews 4.6)
- Legal: Use Opulence layout as inspiration only — rebuild with Tailwind, no asset copy.

> Build command: `npx create-next-app@latest crown-patliputra --typescript --tailwind --app` then implement per §5.1–5.2 first.
