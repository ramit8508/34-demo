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

export interface ReferencePackageData {
  productName: string;
  brand: string;
  manufacturer: string;
  manufacturerAddress: string;
  countryOfOrigin: string;
  netQuantity: string;
  mrp: string;
  unitSalePrice: string;
  packDate: string;
  bestBefore: string;
  consumerCare: string;
  batchLot: string;
  statutoryMarkings: string;
  pdpAreaRequirement: string;
  minDeclarationHeight: string;
  packageDimensions: string;
}

export interface ObservedPackageData {
  productName: string;
  brand: string;
  manufacturer: string;
  manufacturerAddress: string;
  countryOfOrigin: string;
  netQuantity: string;
  mrp: string;
  unitSalePrice: string;
  packDate: string;
  bestBefore: string;
  consumerCare: string;
  batchLot: string;
  statutoryMarkings: string;
  pdpAreaObserved: string;
  measuredDeclarationHeight: string;
  packageDimensions: string;
}

export type ValidationStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'REVIEW' | 'NOT_APPLICABLE';

export interface ValidationFinding {
  fieldId: string;
  category: 'Identity & Origin' | 'Pricing & Quantity' | 'Dates & Batch' | 'Consumer & Statutory' | 'Panel & Readability';
  ruleId: string;
  ruleTitle: string;
  plainLanguageExplanation: string;
  expected: string;
  observed: string;
  status: ValidationStatus;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
  findingNote?: string;
  evidencePanel: 'front' | 'back' | 'left' | 'right';
  evidenceHighlightArea: string;
}

export interface InspectionScenario {
  product: ProductRecord;
  referenceData: ReferencePackageData;
  observedData: ObservedPackageData;
  validationResults: ValidationFinding[];
}

/**
 * Single source of truth for the MetriGuard demo product (Scenario A - Compliant).
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
 * Controlled demonstration scenario (Scenario B - Non-Compliant with realistic findings).
 */
export const SYNTHETIC_DEMO_NON_COMPLIANT_PRODUCT: ProductRecord = {
  id: 'INSP-002',
  gtin: '8901234567890',
  product: 'FreshBite Premium Roasted Peanuts',
  brand: 'FreshBite',
  packSize: '200 g',
  netQuantity: '200 g',
  manufacturer: 'FreshBite Foods Pvt. Ltd.',
  mrp: '₹120.00',
  category: 'Packaged Food Commodity',
  type: 'Solid Commodity',
};

/**
 * Complete Scenario A Dataset: Lay's India's Magic Masala (Compliant).
 */
export const LAYS_SCENARIO: InspectionScenario = {
  product: STORED_DEMO_PRODUCT,
  referenceData: {
    productName: "Lay's India's Magic Masala",
    brand: "Lay's",
    manufacturer: 'PepsiCo India Holdings Pvt Ltd',
    manufacturerAddress: 'Level 3-5, Pioneer Square, Sector 62, Gurugram, Haryana - 122002',
    countryOfOrigin: 'India',
    netQuantity: '50 g',
    mrp: '₹20.00',
    unitSalePrice: '₹0.40 / g (₹400.00 / kg)',
    packDate: '10/2024',
    bestBefore: '4 months from manufacture',
    consumerCare: '1800 226 226 / feedback@pepsico.com',
    batchLot: 'B2409-N2',
    statutoryMarkings: 'FSSAI Lic. No. 10014064000435 · Green Vegetarian Symbol',
    pdpAreaRequirement: '≥ 40% surface area',
    minDeclarationHeight: '≥ 1.5 mm (for ≤ 50g package)',
    packageDimensions: 'Not applicable for solid snack pouch',
  },
  observedData: {
    productName: "Lay's India's Magic Masala Potato Chips",
    brand: "Lay's",
    manufacturer: 'PepsiCo India Holdings Pvt Ltd',
    manufacturerAddress: 'Level 3-5, Pioneer Square, Sector 62, Gurugram, Haryana - 122002',
    countryOfOrigin: 'India',
    netQuantity: '50 g',
    mrp: '₹20.00 (Incl. of all taxes)',
    unitSalePrice: '₹0.40 / g (₹400.00 / kg)',
    packDate: '10/2024',
    bestBefore: 'Best before 4 months from manufacture',
    consumerCare: '1800 226 226 / feedback@pepsico.com',
    batchLot: 'BATCH: B2409-N2',
    statutoryMarkings: 'Lic. No. 10014064000435 · Green Veg Symbol Present',
    pdpAreaObserved: 'Compliant (Area ratio 44.8%)',
    measuredDeclarationHeight: '1.8 mm (Compliant font height)',
    packageDimensions: '—',
  },
  validationResults: [
    {
      fieldId: 'productName',
      category: 'Identity & Origin',
      ruleId: 'Rule 6(1)(b)',
      ruleTitle: 'Commodity / Product Name',
      plainLanguageExplanation: 'Requires the generic or common commodity title to be clearly declared on the Principal Display Panel.',
      expected: "Lay's India's Magic Masala",
      observed: "Lay's India's Magic Masala Potato Chips",
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'front',
      evidenceHighlightArea: 'Principal Display Panel (Brand Zone)',
    },
    {
      fieldId: 'manufacturerName',
      category: 'Identity & Origin',
      ruleId: 'Rule 6(1)(a)',
      ruleTitle: 'Manufacturer / Packer Name',
      plainLanguageExplanation: 'Requires the complete registered corporate or operational name of the manufacturer or packer.',
      expected: 'PepsiCo India Holdings Pvt Ltd',
      observed: 'PepsiCo India Holdings Pvt Ltd',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Manufacturer Box)',
    },
    {
      fieldId: 'manufacturerAddress',
      category: 'Identity & Origin',
      ruleId: 'Rule 6(1)(a)',
      ruleTitle: 'Complete Registered Address',
      plainLanguageExplanation: 'Requires the full physical premises address with state and postal PIN code.',
      expected: 'Gurugram, Haryana - 122002',
      observed: 'Level 3-5, Pioneer Square, Sector 62, Gurugram, Haryana - 122002',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Address Line)',
    },
    {
      fieldId: 'countryOfOrigin',
      category: 'Identity & Origin',
      ruleId: 'Rule 6(1)(n)',
      ruleTitle: 'Country of Origin',
      plainLanguageExplanation: 'Mandatory declaration of country of origin for packaged commodities.',
      expected: 'India',
      observed: 'India',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Origin Tag)',
    },
    {
      fieldId: 'netQuantity',
      category: 'Pricing & Quantity',
      ruleId: 'Rule 6(1)(c)',
      ruleTitle: 'Net Quantity Declaration',
      plainLanguageExplanation: 'Requires the net weight or volume declared in prescribed metric measurement units.',
      expected: '50 g',
      observed: '50 g',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'front',
      evidenceHighlightArea: 'PDP Net Quantity Zone (Bottom Right)',
    },
    {
      fieldId: 'mrp',
      category: 'Pricing & Quantity',
      ruleId: 'Rule 6(1)(e)',
      ruleTitle: 'Maximum Retail Price (MRP)',
      plainLanguageExplanation: 'Requires the retail sale price in Indian Rupees inclusive of all applicable taxes.',
      expected: '₹20.00',
      observed: '₹20.00 (Incl. of all taxes)',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'MRP & Batch Cluster',
    },
    {
      fieldId: 'unitSalePrice',
      category: 'Pricing & Quantity',
      ruleId: 'Rule 6(1)(s)',
      ruleTitle: 'Unit Sale Price (USP)',
      plainLanguageExplanation: 'Requires price per unit (per g/kg/ml) declared for transparent consumer price comparison.',
      expected: '₹0.40 / g (₹400.00 / kg)',
      observed: '₹0.40 / g (₹400.00 / kg)',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'MRP Cluster Region',
    },
    {
      fieldId: 'packDate',
      category: 'Dates & Batch',
      ruleId: 'Rule 6(1)(d)',
      ruleTitle: 'Date of Manufacture / Packing',
      plainLanguageExplanation: 'Requires prominent declaration of the month and year of pre-packing or manufacture.',
      expected: '10/2024',
      observed: '10/2024',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Date Stamp Region',
    },
    {
      fieldId: 'bestBefore',
      category: 'Dates & Batch',
      ruleId: 'Rule 6(1)(d)',
      ruleTitle: 'Best Before / Expiry Advisory',
      plainLanguageExplanation: 'Prescribed shelf-life advisory for consumable or perishable packaged commodities.',
      expected: '4 months from manufacture',
      observed: 'Best before 4 months from manufacture',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Advisory Block)',
    },
    {
      fieldId: 'consumerCare',
      category: 'Consumer & Statutory',
      ruleId: 'Rule 10',
      ruleTitle: 'Consumer Care / Grievance Redressal',
      plainLanguageExplanation: 'Requires designated person title, address, toll-free telephone and email address.',
      expected: '1800 226 226 / feedback@pepsico.com',
      observed: '1800 226 226 / feedback@pepsico.com',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Grievance Box)',
    },
    {
      fieldId: 'batchLot',
      category: 'Dates & Batch',
      ruleId: 'Rule 6(1)(d)',
      ruleTitle: 'Batch / Lot Identification',
      plainLanguageExplanation: 'Identification code distinguishing the specific industrial packaging run.',
      expected: 'B2409-N2',
      observed: 'BATCH: B2409-N2',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Batch Coding Stamp',
    },
    {
      fieldId: 'statutoryMarkings',
      category: 'Consumer & Statutory',
      ruleId: 'Rule 6(1)(f)',
      ruleTitle: 'Required Statutory Markings / FSSAI',
      plainLanguageExplanation: 'Statutory regulatory markings, including green vegetarian symbol and valid license code.',
      expected: 'FSSAI Lic. No. 10014064000435 · Veg Dot',
      observed: 'Lic. No. 10014064000435 · Green Vegetarian Dot Present',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Statutory Markings & FSSAI Logo',
    },
    {
      fieldId: 'pdpRequirements',
      category: 'Panel & Readability',
      ruleId: 'Rule 7',
      ruleTitle: 'Principal Display Panel Requirements',
      plainLanguageExplanation: 'Mandates minimum percentage area of front package dedicated to statutory identification.',
      expected: '≥ 40% surface area',
      observed: 'Compliant (Area ratio 44.8%)',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'front',
      evidenceHighlightArea: 'Principal Display Panel Envelope',
    },
    {
      fieldId: 'declarationFontSize',
      category: 'Panel & Readability',
      ruleId: 'Rule 9',
      ruleTitle: 'Declaration Font Size & Legibility',
      plainLanguageExplanation: 'Ensures numeral and letter height satisfies the minimum size prescribed for the package area.',
      expected: '≥ 1.5 mm',
      observed: '1.8 mm (Compliant high-contrast font)',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Declaration Typography Block',
    },
    {
      fieldId: 'packageDimensions',
      category: 'Panel & Readability',
      ruleId: 'Rule 6(1)(k)',
      ruleTitle: 'Package Dimensions',
      plainLanguageExplanation: 'Applicable when packaging size determines legal quantity standard or container volume.',
      expected: 'Not applicable for solid snack pouch',
      observed: '—',
      status: 'NOT_APPLICABLE',
      severity: 'NONE',
      findingNote: 'Not required for standard flexible solid snack pouch commodities.',
      evidencePanel: 'front',
      evidenceHighlightArea: 'Package Envelope',
    },
  ],
};

/**
 * Complete Scenario B Dataset: FreshBite Premium Roasted Peanuts (Controlled Non-Compliant).
 */
export const FRESHBITE_SCENARIO: InspectionScenario = {
  product: SYNTHETIC_DEMO_NON_COMPLIANT_PRODUCT,
  referenceData: {
    productName: 'FreshBite Premium Roasted Peanuts',
    brand: 'FreshBite',
    manufacturer: 'FreshBite Foods Pvt. Ltd.',
    manufacturerAddress: '24 Industrial Estate, Bengaluru, Karnataka, India',
    countryOfOrigin: 'India',
    netQuantity: '200 g',
    mrp: '₹120.00',
    unitSalePrice: '₹600/kg',
    packDate: '01/09/2026',
    bestBefore: '6 months from packaging',
    consumerCare: '1800-123-4567 / care@freshbite.example',
    batchLot: 'FB-PN-260901',
    statutoryMarkings: 'FSSAI Lic. No. 11223004000551',
    pdpAreaRequirement: '≥ 40% surface area',
    minDeclarationHeight: '≥ 1.5 mm (for 200g package)',
    packageDimensions: 'Not applicable for pouch packaging',
  },
  observedData: {
    productName: 'FreshBite Premium Roasted Peanuts',
    brand: 'FreshBite',
    manufacturer: 'FreshBite Foods Pvt. Ltd.',
    manufacturerAddress: '24 Industrial Estate, Bengaluru, Karnataka, India',
    countryOfOrigin: 'India',
    netQuantity: '180 g',
    mrp: '₹120.00',
    unitSalePrice: 'Not detected',
    packDate: '01/09/2026',
    bestBefore: '6 months from packaging',
    consumerCare: 'Not detected',
    batchLot: 'FB-PN-260901',
    statutoryMarkings: 'Lic. No. 11223004000551 · Green Vegetarian Mark',
    pdpAreaObserved: 'Compliant (Area ratio 45.4%)',
    measuredDeclarationHeight: '1.0 mm',
    packageDimensions: '—',
  },
  validationResults: [
    {
      fieldId: 'productName',
      category: 'Identity & Origin',
      ruleId: 'Rule 6(1)(b)',
      ruleTitle: 'Commodity / Product Name',
      plainLanguageExplanation: 'Requires the generic or common commodity title to be clearly declared on the Principal Display Panel.',
      expected: 'FreshBite Premium Roasted Peanuts',
      observed: 'FreshBite Premium Roasted Peanuts',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'front',
      evidenceHighlightArea: 'Principal Display Panel (Upper PDP)',
    },
    {
      fieldId: 'manufacturerName',
      category: 'Identity & Origin',
      ruleId: 'Rule 6(1)(a)',
      ruleTitle: 'Manufacturer / Packer Name',
      plainLanguageExplanation: 'Requires the complete registered corporate or operational name of the manufacturer or packer.',
      expected: 'FreshBite Foods Pvt. Ltd.',
      observed: 'FreshBite Foods Pvt. Ltd.',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Manufacturer Block)',
    },
    {
      fieldId: 'manufacturerAddress',
      category: 'Identity & Origin',
      ruleId: 'Rule 6(1)(a)',
      ruleTitle: 'Complete Registered Address',
      plainLanguageExplanation: 'Requires the full physical premises address with state and postal PIN code.',
      expected: '24 Industrial Estate, Bengaluru, Karnataka, India',
      observed: '24 Industrial Estate, Bengaluru, Karnataka, India',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Address Clause)',
    },
    {
      fieldId: 'countryOfOrigin',
      category: 'Identity & Origin',
      ruleId: 'Rule 6(1)(n)',
      ruleTitle: 'Country of Origin',
      plainLanguageExplanation: 'Mandatory declaration of country of origin for packaged commodities.',
      expected: 'India',
      observed: 'India',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Origin Tag)',
    },
    // Finding 1: Net Quantity Mismatch (NON_COMPLIANT)
    {
      fieldId: 'netQuantity',
      category: 'Pricing & Quantity',
      ruleId: 'Rule 6(1)(c)',
      ruleTitle: 'Net Quantity Declaration',
      plainLanguageExplanation: 'Requires the net quantity declared to match the standard catalog specification in metric units.',
      expected: '200 g',
      observed: '180 g',
      status: 'NON_COMPLIANT',
      severity: 'HIGH',
      findingNote: 'Declared quantity differs from the expected/reference quantity (Expected: 200 g, Observed: 180 g).',
      evidencePanel: 'front',
      evidenceHighlightArea: 'PDP Net Quantity Zone (Lower 40%)',
    },
    {
      fieldId: 'mrp',
      category: 'Pricing & Quantity',
      ruleId: 'Rule 6(1)(e)',
      ruleTitle: 'Maximum Retail Price (MRP)',
      plainLanguageExplanation: 'Requires the retail sale price in Indian Rupees inclusive of all applicable taxes.',
      expected: '₹120.00',
      observed: '₹120.00',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'MRP & Batch Cluster',
    },
    // Finding 2: Unit Sale Price Missing (NON_COMPLIANT)
    {
      fieldId: 'unitSalePrice',
      category: 'Pricing & Quantity',
      ruleId: 'Rule 6(1)(s)',
      ruleTitle: 'Unit Sale Price (USP)',
      plainLanguageExplanation: 'Requires the unit sale price (per g or kg) to be declared for packaged commodities exceeding 100 g.',
      expected: '₹600/kg',
      observed: 'Not detected',
      status: 'NON_COMPLIANT',
      severity: 'HIGH',
      findingNote: 'Mandatory Unit Sale Price (USP) declaration is missing on package exceeding 100 g threshold.',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel / Price Region',
    },
    {
      fieldId: 'packDate',
      category: 'Dates & Batch',
      ruleId: 'Rule 6(1)(d)',
      ruleTitle: 'Date of Manufacture / Packing',
      plainLanguageExplanation: 'Requires prominent declaration of the month and year of pre-packing or manufacture.',
      expected: '01/09/2026',
      observed: '01/09/2026',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Date Stamp Region',
    },
    {
      fieldId: 'bestBefore',
      category: 'Dates & Batch',
      ruleId: 'Rule 6(1)(d)',
      ruleTitle: 'Best Before / Expiry Advisory',
      plainLanguageExplanation: 'Prescribed shelf-life advisory for consumable or perishable packaged commodities.',
      expected: '6 months from packaging',
      observed: '6 months from packaging',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Advisory)',
    },
    // Finding 3: Consumer Care Details Missing (NON_COMPLIANT)
    {
      fieldId: 'consumerCare',
      category: 'Consumer & Statutory',
      ruleId: 'Rule 10',
      ruleTitle: 'Consumer Care Details',
      plainLanguageExplanation: 'Requires complete consumer grievance redressal contact information (helpline/email) on the package.',
      expected: '1800-123-4567 / care@freshbite.example',
      observed: 'Not detected',
      status: 'NON_COMPLIANT',
      severity: 'HIGH',
      findingNote: 'Mandatory consumer grievance contact details (telephone/email) were not detected on the information panel.',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Information Panel (Consumer Care Block)',
    },
    {
      fieldId: 'batchLot',
      category: 'Dates & Batch',
      ruleId: 'Rule 6(1)(d)',
      ruleTitle: 'Batch / Lot Identification',
      plainLanguageExplanation: 'Identification code distinguishing the specific industrial packaging run.',
      expected: 'FB-PN-260901',
      observed: 'FB-PN-260901',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Batch Coding Stamp',
    },
    {
      fieldId: 'statutoryMarkings',
      category: 'Consumer & Statutory',
      ruleId: 'Rule 6(1)(f)',
      ruleTitle: 'Required Statutory Markings / FSSAI',
      plainLanguageExplanation: 'Statutory regulatory markings, including green vegetarian symbol and valid license code.',
      expected: 'FSSAI Lic. No. 11223004000551',
      observed: 'Lic. No. 11223004000551 · Green Vegetarian Mark',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Statutory Markings & FSSAI Logo',
    },
    {
      fieldId: 'pdpRequirements',
      category: 'Panel & Readability',
      ruleId: 'Rule 7',
      ruleTitle: 'Principal Display Panel Requirements',
      plainLanguageExplanation: 'Mandates minimum percentage area of front package dedicated to statutory identification.',
      expected: '≥ 40% surface area',
      observed: 'Compliant (Area ratio 45.4%)',
      status: 'COMPLIANT',
      severity: 'NONE',
      evidencePanel: 'front',
      evidenceHighlightArea: 'Front Panel Envelope',
    },
    // Finding 4: Declaration Font Size / Legibility Below Minimum (NON_COMPLIANT)
    {
      fieldId: 'declarationFontSize',
      category: 'Panel & Readability',
      ruleId: 'Rule 9',
      ruleTitle: 'Declaration Font Size & Legibility',
      plainLanguageExplanation: 'Requires minimum numeral and letter height determined by the package display panel area.',
      expected: '≥ 1.5 mm',
      observed: '1.0 mm',
      status: 'NON_COMPLIANT',
      severity: 'MEDIUM',
      findingNote: 'The measured declaration character height (1.0 mm) is 0.5 mm below the applicable minimum requirement (≥ 1.5 mm) for this package display area.',
      evidencePanel: 'back',
      evidenceHighlightArea: 'Declaration Typography / Numeral Block',
    },
    {
      fieldId: 'packageDimensions',
      category: 'Panel & Readability',
      ruleId: 'Rule 6(1)(k)',
      ruleTitle: 'Package Dimensions',
      plainLanguageExplanation: 'Applicable when packaging size determines legal quantity standard or container volume.',
      expected: 'Not applicable for pouch packaging',
      observed: '—',
      status: 'NOT_APPLICABLE',
      severity: 'NONE',
      findingNote: 'Not required for standard flexible solid snack pouch commodities.',
      evidencePanel: 'front',
      evidenceHighlightArea: 'Package Envelope',
    },
  ],
};

/**
 * Resolve product record by GTIN barcode or internal ID.
 */
export function resolveProductByCode(code: string): ProductRecord {
  const clean = code.trim();
  if (
    clean === SYNTHETIC_DEMO_NON_COMPLIANT_PRODUCT.gtin ||
    clean === SYNTHETIC_DEMO_NON_COMPLIANT_PRODUCT.id ||
    clean.includes('8901234') ||
    clean.toLowerCase().includes('freshbite') ||
    clean.toLowerCase().includes('peanut')
  ) {
    return SYNTHETIC_DEMO_NON_COMPLIANT_PRODUCT;
  }
  return STORED_DEMO_PRODUCT;
}

/**
 * Retrieve the full deterministic inspection scenario (Reference, Observed, Findings)
 * for any given product or identifier.
 */
export function getInspectionScenario(productOrId: string | ProductRecord): InspectionScenario {
  const code = typeof productOrId === 'string' ? productOrId : productOrId.id || productOrId.gtin;
  const prod = resolveProductByCode(code);
  if (prod.id === SYNTHETIC_DEMO_NON_COMPLIANT_PRODUCT.id) {
    return FRESHBITE_SCENARIO;
  }
  return LAYS_SCENARIO;
}
