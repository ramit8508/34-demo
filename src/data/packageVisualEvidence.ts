/**
 * High-fidelity vector package evidence for deterministic inspection reporting.
 * Provides crisp SVG package representations and precise bounding regions for violation evidence.
 */

// ─── Lay's Front Panel SVG ────────────────────────────────────
export const LAYS_FRONT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" width="400" height="560">
  <defs>
    <linearGradient id="laysBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD100"/>
      <stop offset="50%" stop-color="#F5B800"/>
      <stop offset="100%" stop-color="#E09600"/>
    </linearGradient>
    <linearGradient id="laysRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C5221F"/>
      <stop offset="100%" stop-color="#9B0000"/>
    </linearGradient>
  </defs>

  <!-- Bag Body -->
  <rect x="15" y="15" width="370" height="530" rx="20" fill="url(#laysBg)" stroke="#B77900" stroke-width="3"/>
  <path d="M 15 35 Q 200 45 385 35" fill="none" stroke="#D98A00" stroke-width="2" stroke-dasharray="4,4"/>
  <path d="M 15 525 Q 200 515 385 525" fill="none" stroke="#D98A00" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- Brand Emblem -->
  <circle cx="200" cy="160" r="75" fill="#E8171F" stroke="#FFFFFF" stroke-width="4"/>
  <path d="M 140 160 Q 200 130 260 160 Q 200 190 140 160 Z" fill="url(#laysRibbon)"/>
  <text x="200" y="172" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="42" fill="#FFFFFF" text-anchor="middle" font-style="italic">Lay's</text>

  <!-- Commodity Flavor & Sub-brand -->
  <rect x="70" y="248" width="260" height="34" rx="6" fill="#1A73E8"/>
  <text x="200" y="271" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="16" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">MAGIC MASALA</text>
  <text x="200" y="302" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="13" fill="#202124" text-anchor="middle">POTATO CHIPS · CRISPS</text>

  <!-- Vegetarian Green Dot Symbol -->
  <rect x="42" y="350" width="26" height="26" fill="#FFFFFF" stroke="#137333" stroke-width="2"/>
  <circle cx="55" cy="363" r="7" fill="#137333"/>

  <!-- Principal Display Panel Declarations -->
  <!-- Net Quantity -->
  <rect x="230" y="440" width="135" height="52" rx="6" fill="#FFFFFF" stroke="#202124" stroke-width="1.5" opacity="0.95"/>
  <text x="297" y="460" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="11" fill="#5F6368" text-anchor="middle">NET QUANTITY</text>
  <text x="297" y="482" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="20" fill="#202124" text-anchor="middle">50 g</text>

  <!-- MRP on Front -->
  <rect x="42" y="440" width="135" height="52" rx="6" fill="#FFFFFF" stroke="#202124" stroke-width="1.5" opacity="0.95"/>
  <text x="109" y="460" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="11" fill="#5F6368" text-anchor="middle">MAX RETAIL PRICE</text>
  <text x="109" y="482" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="18" fill="#202124" text-anchor="middle">₹ 20.00</text>

  <!-- Regulatory Footer Note -->
  <text x="200" y="515" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#5F6368" text-anchor="middle">Proprietary Food · Package contains 50g Potato Chips</text>
</svg>
`)}`;

// ─── Lay's Back Panel SVG ─────────────────────────────────────
export const LAYS_BACK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" width="400" height="560">
  <!-- Back Bag Background -->
  <rect x="15" y="15" width="370" height="530" rx="14" fill="#FAFAFA" stroke="#D1D5DB" stroke-width="2"/>

  <!-- Header: Mandatory Information Panel -->
  <rect x="25" y="25" width="350" height="28" fill="#202124"/>
  <text x="200" y="44" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="12" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">MANDATORY INFORMATION PANEL</text>

  <!-- Commodity & Brand -->
  <text x="35" y="75" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="13" fill="#202124">Lay's India's Magic Masala Potato Chips</text>
  <text x="35" y="92" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#5F6368">Common Commodity Name: Potato Chips (Solid Snack Food)</text>

  <line x1="35" y1="102" x2="365" y2="102" stroke="#E5E7EB" stroke-width="1"/>

  <!-- Manufacturer & Packer Address Block -->
  <text x="35" y="120" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="10" fill="#202124">MANUFACTURED & PACKED BY:</text>
  <text x="35" y="135" font-family="Arial, Helvetica, sans-serif" font-size="9.5" fill="#374151">PepsiCo India Holdings Pvt Ltd</text>
  <text x="35" y="148" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#4B5563">Level 3-5, Pioneer Square, Sector 62, Gurugram, Haryana - 122002</text>
  <text x="35" y="161" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#137333" font-weight="600">Country of Origin: India</text>

  <line x1="35" y1="172" x2="365" y2="172" stroke="#E5E7EB" stroke-width="1"/>

  <!-- Pricing, Unit Price & Net Quantity Cluster -->
  <rect x="35" y="182" width="330" height="70" rx="4" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1"/>
  <text x="45" y="200" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" fill="#202124">MAXIMUM RETAIL PRICE (MRP):</text>
  <text x="240" y="200" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="800" fill="#202124">₹20.00 (Incl. of all taxes)</text>
  
  <text x="45" y="220" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" fill="#202124">UNIT SALE PRICE (USP):</text>
  <text x="240" y="220" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="600" fill="#202124">₹0.40 / g (₹400.00 / kg)</text>

  <text x="45" y="240" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" fill="#202124">NET QUANTITY:</text>
  <text x="240" y="240" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="800" fill="#202124">50 g</text>

  <!-- Batch & Date Block -->
  <rect x="35" y="260" width="330" height="58" rx="4" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
  <text x="45" y="278" font-family="Courier, monospace" font-size="10" font-weight="700" fill="#111827">BATCH NO: B2409-N2</text>
  <text x="45" y="293" font-family="Courier, monospace" font-size="10" font-weight="700" fill="#111827">MFD DATE: 10/2024</text>
  <text x="45" y="307" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#4B5563">Best before 4 months from manufacture</text>

  <!-- Consumer Care Box -->
  <rect x="35" y="326" width="330" height="58" rx="4" fill="#F9FAFB" stroke="#93C5FD" stroke-width="1"/>
  <text x="45" y="344" font-family="Arial, Helvetica, sans-serif" font-size="9.5" font-weight="700" fill="#1E40AF">CONSUMER CARE & GRIEVANCE REDRESSAL:</text>
  <text x="45" y="359" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#374151">Toll Free Helpline: 1800 226 226</text>
  <text x="45" y="372" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#374151">Email: feedback@pepsico.com | Address: Consumer Manager, same as above</text>

  <!-- Statutory Markings & FSSAI -->
  <text x="35" y="405" font-family="Arial, Helvetica, sans-serif" font-size="9.5" font-weight="700" fill="#1F2937">FSSAI Lic. No. 10014064000435</text>
  <rect x="35" y="415" width="20" height="20" fill="#FFFFFF" stroke="#137333" stroke-width="1.5"/>
  <circle cx="45" cy="425" r="5" fill="#137333"/>
  <text x="62" y="429" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#137333" font-weight="600">Green Vegetarian Dot Symbol</text>

  <!-- Barcode Visual -->
  <rect x="35" y="450" width="180" height="60" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1"/>
  <!-- Barcode lines -->
  <path d="M 45 455 v 38 M 49 455 v 38 M 55 455 v 38 M 60 455 v 38 M 64 455 v 38 M 70 455 v 38 M 75 455 v 38 M 82 455 v 38 M 88 455 v 38 M 94 455 v 38 M 100 455 v 38 M 108 455 v 38 M 115 455 v 38 M 122 455 v 38 M 128 455 v 38 M 135 455 v 38 M 142 455 v 38 M 150 455 v 38 M 158 455 v 38 M 165 455 v 38 M 172 455 v 38 M 180 455 v 38 M 190 455 v 38 M 198 455 v 38" stroke="#111827" stroke-width="2.2"/>
  <text x="125" y="504" font-family="Courier, monospace" font-size="10" fill="#111827" text-anchor="middle" font-weight="700">8901491101844</text>
  
  <text x="300" y="480" font-family="Arial, Helvetica, sans-serif" font-size="8.5" fill="#6B7280" text-anchor="middle">Standard Packaging</text>
  <text x="300" y="495" font-family="Arial, Helvetica, sans-serif" font-size="8.5" fill="#137333" text-anchor="middle" font-weight="600">PCR 2011 Compliant</text>
</svg>
`)}`;

// ─── FreshBite Front Panel SVG (Controlled Non-Compliant) ─────
export const FRESHBITE_FRONT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" width="400" height="560">
  <defs>
    <linearGradient id="fbBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C28E5A"/>
      <stop offset="50%" stop-color="#A56E3A"/>
      <stop offset="100%" stop-color="#804F23"/>
    </linearGradient>
  </defs>

  <!-- Bag Body -->
  <rect x="15" y="15" width="370" height="530" rx="20" fill="url(#fbBg)" stroke="#5A3412" stroke-width="3"/>

  <!-- Top Badge -->
  <rect x="120" y="35" width="160" height="28" rx="14" fill="#2E1C0C"/>
  <text x="200" y="53" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="11" fill="#EBD2B9" text-anchor="middle" letter-spacing="1">PREMIUM QUALITY</text>

  <!-- Brand Title -->
  <text x="200" y="125" font-family="'Georgia', serif" font-weight="900" font-size="34" fill="#FFFFFF" text-anchor="middle">FreshBite</text>
  <text x="200" y="152" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="#FCE8D5" text-anchor="middle" letter-spacing="2">ROASTED PEANUTS</text>
  <text x="200" y="172" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#FFFFFF" text-anchor="middle">Salted & Crunchy Snack</text>

  <!-- Center Peanut Illustration Graphic -->
  <circle cx="200" cy="270" r="70" fill="#EAD5C3" stroke="#FFFFFF" stroke-width="3"/>
  <ellipse cx="185" cy="265" rx="26" ry="42" fill="#B2743E" transform="rotate(-20 185 265)"/>
  <ellipse cx="215" cy="275" rx="26" ry="42" fill="#985C29" transform="rotate(25 215 275)"/>

  <!-- Vegetarian Dot Symbol -->
  <rect x="42" y="380" width="24" height="24" fill="#FFFFFF" stroke="#137333" stroke-width="2"/>
  <circle cx="54" cy="392" r="6" fill="#137333"/>

  <!-- VIOLATION 01: Net Quantity Printed is 180 g instead of 200 g -->
  <!-- Target highlight zone around Net Quantity -->
  <g id="violation-net-quantity-zone">
    <rect x="220" y="435" width="145" height="60" rx="8" fill="#FFFFFF" stroke="#C5221F" stroke-width="2.5"/>
    <text x="292" y="455" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="10" fill="#5F6368" text-anchor="middle">NET QUANTITY</text>
    <text x="292" y="480" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="22" fill="#C5221F" text-anchor="middle">180 g</text>
  </g>

  <!-- MRP Box -->
  <rect x="42" y="435" width="145" height="60" rx="8" fill="#FFFFFF" stroke="#202124" stroke-width="1.5"/>
  <text x="114" y="455" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="10" fill="#5F6368" text-anchor="middle">MAX RETAIL PRICE</text>
  <text x="114" y="480" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="19" fill="#202124" text-anchor="middle">₹ 120.00</text>

  <!-- Bottom Barcode -->
  <text x="200" y="525" font-family="Courier, monospace" font-size="10" fill="#FFFFFF" text-anchor="middle">GTIN: 8901234567890</text>
</svg>
`)}`;

// ─── FreshBite Back Panel SVG (Controlled Non-Compliant) ──────
export const FRESHBITE_BACK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" width="400" height="560">
  <!-- Back Bag Background -->
  <rect x="15" y="15" width="370" height="530" rx="14" fill="#FFFDF8" stroke="#D1D5DB" stroke-width="2"/>

  <!-- Header -->
  <rect x="25" y="25" width="350" height="28" fill="#4B2C15"/>
  <text x="200" y="44" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="12" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">INFORMATION & DECLARATIONS PANEL</text>

  <!-- Commodity & Brand -->
  <text x="35" y="75" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="13" fill="#202124">FreshBite Premium Roasted Peanuts</text>
  <text x="35" y="90" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#5F6368">Category: Packaged Roasted Peanuts (Solid Commodity)</text>

  <line x1="35" y1="100" x2="365" y2="100" stroke="#E5E7EB" stroke-width="1"/>

  <!-- Manufacturer & Packer Address Block -->
  <text x="35" y="118" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="10" fill="#202124">MANUFACTURED & PACKED BY:</text>
  <text x="35" y="132" font-family="Arial, Helvetica, sans-serif" font-size="9.5" fill="#374151">FreshBite Foods Pvt. Ltd.</text>
  <text x="35" y="145" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#4B5563">24 Industrial Estate, Bengaluru, Karnataka, India</text>
  <text x="35" y="158" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#137333" font-weight="600">Country of Origin: India</text>

  <line x1="35" y1="168" x2="365" y2="168" stroke="#E5E7EB" stroke-width="1"/>

  <!-- Pricing Cluster -->
  <rect x="35" y="178" width="330" height="74" rx="4" fill="#FFF7ED" stroke="#FDBA74" stroke-width="1"/>
  <text x="45" y="196" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" fill="#202124">MRP (INCL. OF ALL TAXES):</text>
  <text x="240" y="196" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="800" fill="#202124">₹120.00</text>

  <!-- VIOLATION 02: Unit Sale Price (USP) MISSING -->
  <g id="violation-missing-usp">
    <rect x="42" y="206" width="316" height="36" rx="4" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5" stroke-dasharray="4,3"/>
    <text x="50" y="222" font-family="Arial, Helvetica, sans-serif" font-size="9.5" font-weight="700" fill="#991B1B">UNIT SALE PRICE (USP): [NOT DECLARED ON PACKAGE]</text>
    <text x="50" y="235" font-family="Arial, Helvetica, sans-serif" font-size="8.5" fill="#B91C1C">Mandatory under Rule 6(1)(s) for packages &gt; 100g (Expected: ₹600/kg)</text>
  </g>

  <!-- Batch, Date & Statutory -->
  <rect x="35" y="260" width="330" height="54" rx="4" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
  <text x="45" y="278" font-family="Courier, monospace" font-size="10" font-weight="700" fill="#111827">BATCH NO: FB-PN-260901</text>
  <text x="45" y="293" font-family="Courier, monospace" font-size="10" font-weight="700" fill="#111827">PKD DATE: 01/09/2026</text>
  <text x="45" y="306" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#4B5563">Best before 6 months from packaging · FSSAI Lic. No. 11223004000551</text>

  <!-- VIOLATION 03: Consumer Care Details MISSING -->
  <g id="violation-missing-consumer-care">
    <rect x="35" y="322" width="330" height="52" rx="4" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5" stroke-dasharray="4,3"/>
    <text x="45" y="340" font-family="Arial, Helvetica, sans-serif" font-size="9.5" font-weight="700" fill="#991B1B">CONSUMER CARE & GRIEVANCE DETAILS: [NOT FOUND]</text>
    <text x="45" y="354" font-family="Arial, Helvetica, sans-serif" font-size="8.5" fill="#B91C1C">Missing mandatory helpline telephone, email & grievance officer address</text>
    <text x="45" y="366" font-family="Arial, Helvetica, sans-serif" font-size="8" fill="#7F1D1D">Violation of Legal Metrology (Packaged Commodities) Rule 10</text>
  </g>

  <!-- VIOLATION 04: Declaration Font Size 1.0mm (below 1.5mm requirement) -->
  <g id="violation-small-font">
    <rect x="35" y="382" width="330" height="48" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <text x="45" y="398" font-family="Arial, Helvetica, sans-serif" font-size="9.5" font-weight="700" fill="#92400E">STATUTORY DECLARATIONS & INGREDIENTS:</text>
    <!-- Intentionally small rendered text (approx 1.0mm equivalent) -->
    <text x="45" y="411" font-family="Arial, Helvetica, sans-serif" font-size="6.5" fill="#451A03" letter-spacing="-0.2">Ingredients: Roasted Peanuts, Edible Vegetable Oil, Iodized Salt. Store in cool dry place.</text>
    <text x="45" y="422" font-family="Arial, Helvetica, sans-serif" font-size="6" fill="#B45309" font-weight="bold">Measured Font Height: 1.0 mm (Deficit: 0.5 mm below required 1.5 mm under Rule 9)</text>
  </g>

  <!-- Barcode Visual -->
  <rect x="35" y="440" width="180" height="60" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1"/>
  <path d="M 45 445 v 38 M 50 445 v 38 M 56 445 v 38 M 62 445 v 38 M 68 445 v 38 M 74 445 v 38 M 80 445 v 38 M 88 445 v 38 M 94 445 v 38 M 102 445 v 38 M 110 445 v 38 M 118 445 v 38 M 126 445 v 38 M 134 445 v 38 M 142 445 v 38 M 150 445 v 38 M 158 445 v 38 M 166 445 v 38 M 174 445 v 38 M 182 445 v 38 M 190 445 v 38 M 198 445 v 38" stroke="#111827" stroke-width="2.2"/>
  <text x="125" y="494" font-family="Courier, monospace" font-size="10" fill="#111827" text-anchor="middle" font-weight="700">8901234567890</text>
  
  <text x="300" y="470" font-family="Arial, Helvetica, sans-serif" font-size="8.5" fill="#6B7280" text-anchor="middle">Physical Package Evidence</text>
  <text x="300" y="485" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#DC2626" text-anchor="middle" font-weight="700">NON-COMPLIANT</text>
</svg>
`)}`;

/**
 * Returns deterministic high-resolution package image evidence for a given product and panel.
 */
export function getPackageEvidenceImage(
  productId: string,
  panel: 'front' | 'back' | 'left' | 'right',
  userFrontImage?: string | null,
  userBackImage?: string | null,
  userLeftImage?: string | null,
  userRightImage?: string | null
): string {
  // If user supplied an image for this view, prioritize it
  if (panel === 'front' && userFrontImage) return userFrontImage;
  if (panel === 'back' && userBackImage) return userBackImage;
  if (panel === 'left' && userLeftImage) return userLeftImage;
  if (panel === 'right' && userRightImage) return userRightImage;

  // Fallback to high-fidelity deterministic scenario evidence
  const isFreshBite =
    productId === 'INSP-002' ||
    productId.includes('8901234') ||
    productId.toLowerCase().includes('freshbite');

  if (isFreshBite) {
    if (panel === 'front') return FRESHBITE_FRONT_SVG;
    if (panel === 'back') return FRESHBITE_BACK_SVG;
    return FRESHBITE_FRONT_SVG;
  }

  // Lay's scenario
  if (panel === 'front') return LAYS_FRONT_SVG;
  if (panel === 'back') return LAYS_BACK_SVG;
  return LAYS_FRONT_SVG;
}
