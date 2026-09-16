import { useState, useRef, useCallback, useEffect } from 'react';
import TopBar from '../components/layout/TopBar';
import Sidebar from '../components/layout/Sidebar';
import MapView from '../components/map/MapView';
import styles from './MapPage.module.css';

const SAT_CATEGORY = { e2d: 'visual', ai: 'ai', analytics: 'analytics' };

export default function MapPage() {
  const [activePanel, setActivePanel] = useState(null);
  const [activeBasemap, setActiveBasemap] = useState('osm');
  const [satCategory, setSatCategory] = useState('visual');
  const [compareMode, setCompareMode] = useState(null);
  const [satellitePanelOpen, setSatellitePanelOpen] = useState(false);
  const [satellitePanelOpen2, setSatellitePanelOpen2] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lon: 78.9629 });
  const mapRef = useRef(null);

  // Panel 2 only exists alongside the second map (compare mode): mirror panel 1
  // there, and stay off otherwise.
  useEffect(() => {
    setSatellitePanelOpen2(compareMode ? satellitePanelOpen : false);
  }, [compareMode, satellitePanelOpen]);

  // Earth to Date, AI and Analytics are the three satellite product categories.
  // They switch the satellite layer rather than opening a side panel; clicking
  // the one that's already showing turns Earth to Date off.
  const handleSelectPanel = useCallback((id) => {
    const cat = SAT_CATEGORY[id];
    if (cat) {
      if (satellitePanelOpen && satCategory === cat) {
        setSatellitePanelOpen(false);
        return;
      }
      setSatCategory(cat);
      setSatellitePanelOpen(true);
      setActivePanel(null);
      return;
    }
    setActivePanel(p => (p === id ? null : id));
  }, [satellitePanelOpen, satCategory]);

  const handleSelectBasemap = useCallback((id) => {
    mapRef.current?.setBasemap(id);
  }, []);

  const handleSearch = useCallback((lngLat, zoom) => {
    mapRef.current?.flyTo(lngLat, zoom);
  }, []);

  const handleClear = useCallback(() => {
    mapRef.current?.clearAll();
  }, []);

  const handleMenuAction = useCallback((action) => {
    switch (action) {
      case 'new-project':
        handleClear();
        break;
      case 'basemap-osm':
        mapRef.current?.setBasemap('osm');
        break;
      case 'basemap-satellite':
        mapRef.current?.setBasemap('satellite');
        break;
      case 'basemap-terrain':
        mapRef.current?.setBasemap('terrain');
        break;
      case 'draw-point':
        mapRef.current?.activateDraw('point');
        break;
      case 'draw-line':
        mapRef.current?.activateDraw('line');
        break;
      case 'draw-polygon':
        mapRef.current?.activateDraw('polygon');
        break;
      case 'draw-clear':
        handleClear();
        break;
      case 'export-geojson':
        mapRef.current?.exportFeatures('geojson');
        break;
      case 'export-kml':
        mapRef.current?.exportFeatures('kml');
        break;
      case 'export-gpx':
        mapRef.current?.exportFeatures('gpx');
        break;
      case 'export-csv':
        mapRef.current?.exportFeatures('csv');
        break;
      case 'export-wkt':
        mapRef.current?.exportFeatures('wkt');
        break;
      case 'export-shapefile':
        mapRef.current?.exportFeatures('shapefile');
        break;
      case 'help-about':
        alert('GEOSYZE v1.0 \u2014 GIS Intelligence Platform');
        break;
      case 'help-shortcuts':
        alert('Keyboard shortcuts:\n\nD: Draw polygon\nM: Measure distance\nCtrl+Z: Undo');
        break;
      default:
        break;
    }
  }, [handleClear]);

  // Track map center for calendar API
  const handleCenterChange = useCallback((center) => {
    if (center) {
      const [lon, lat] = center;
      setMapCenter({ lat, lon });
    }
  }, []);

  return (
    <div className={styles.page}>
      <TopBar onMenuAction={handleMenuAction} compareMode={compareMode} setCompareMode={setCompareMode} onSearch={handleSearch} />
      <div className={styles.body}>
        <Sidebar
          activePanel={activePanel}
          onSelectPanel={handleSelectPanel}
          activeBasemap={activeBasemap}
          onSelectBasemap={handleSelectBasemap}
          satelliteOpen={satellitePanelOpen || satellitePanelOpen2}
          satCategory={satCategory}
        />
        <main className={styles.mapArea}>
          <MapView
            ref={mapRef}
            compareMode={compareMode}
            setCompareMode={setCompareMode}
            satellitePanelOpen={satellitePanelOpen}
            setSatellitePanelOpen={setSatellitePanelOpen}
            satellitePanelOpen2={satellitePanelOpen2}
            setSatellitePanelOpen2={setSatellitePanelOpen2}
            onCenterChange={handleCenterChange}
            onBasemapChange={setActiveBasemap}
            satCategory={satCategory}
            onSatCategoryChange={setSatCategory}
            center={mapCenter}
          />
        </main>
      </div>
    </div>
  );
}
