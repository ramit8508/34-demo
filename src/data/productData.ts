export interface ProductRecord {
  id: string;
  gtin: string;
  product: string;
  brand: string;
  packSize: string;
  netQuantity: string;
  manufacturer: string;
  mrp: string;
  category: string;
  type: string;
}

/**
 * Single source of truth for the MetriGuard demo product.
 * Consistent across Scanner, Manual Entry, Identified state, and future workflows.
 */
export const STORED_DEMO_PRODUCT: ProductRecord = {
  id: 'INSP-001',
  gtin: '8901491101844',
  product: "Lay's India's Magic Masala",
  brand: "Lay's",
  packSize: '50 g',
  netQuantity: '50 g',
  manufacturer: 'PepsiCo India Holdings Pvt Ltd',
  mrp: '₹20.00',
  category: 'Snack Food',
  type: 'Solid Commodity',
};

/**
 * Resolve product record by GTIN barcode or internal ID.
 */
export function resolveProductByCode(code: string): ProductRecord | null {
  const clean = code.trim();
  if (
    clean === STORED_DEMO_PRODUCT.gtin ||
    clean === STORED_DEMO_PRODUCT.id ||
    clean.startsWith('89014911') ||
    clean === ''
  ) {
    return STORED_DEMO_PRODUCT;
  }
  // Allow flexible lookup in demo
  return STORED_DEMO_PRODUCT;
}
