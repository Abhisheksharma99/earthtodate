// Earth to Date product categories. Shared by SatellitePanel (which filters
// products by category) and the sidebar's Earth to Date panel (which renders
// the category switcher, so the app keeps a single icon rail).
export const RAIL_CATEGORIES = {
  visual: {
    label: 'Visual',
    products: ['visual', 'spectral', 's1', 'nightlight'],
  },
  ai: {
    label: 'AI',
    products: ['changes_tci', '_scl', '_lulc', '_soilmoisture'],
  },
  analytics: {
    label: 'Analytics',
    products: [
      'map', 'aerial', 'esriworldimagery', 'basemap', 'dem', 'worldcover',
      '_bgwaterleak', 'flood', '_biomassgrassland', 'newconstruction',
      'soilsalinity', 'pollution', '_mineralmap',
    ],
  },
};

export const CATEGORY_ICONS = {
  visual: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  ai: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>
      <path d="M19 15l.9 2.4L22 18l-2.1.6L19 21l-.9-2.4L16 18l2.1-.6z"/>
    </svg>
  ),
  analytics: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
};
