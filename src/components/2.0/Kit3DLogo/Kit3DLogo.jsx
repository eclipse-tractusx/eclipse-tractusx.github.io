/*********************************************************************************
 * Eclipse Tractus-X - eclipse-tractusx.github.io
 *
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import React, { useMemo } from 'react';
import { kitsData } from '@site/data/kitsData';
import styles from './Kit3DLogo.module.scss';

/**
 * Kit3DLogo - A 3D isometric stacked logo component for Tractus-X kits
 * 
 * @param {Object} props - Component props
 * @param {string} props.kitId - The unique identifier of the kit to display
 * @param {string} [props.className] - Optional additional CSS class
 * @param {boolean} [props.showDownload=false] - Show download button to save as image
 * @returns {JSX.Element} The 3D logo component
 * 
 * @example
 * <Kit3DLogo kitId="connector" />
 * <Kit3DLogo kitId="digital-twin" className="custom-class" showDownload={true} />
 */
const Kit3DLogo = ({ kitId, className = '', showDownload = false }) => {
  const containerRef = React.useRef(null);
  const [showDownloadOptions, setShowDownloadOptions] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadingFrom, setDownloadingFrom] = React.useState(null); // 'main' or 'dropdown'
  const [downloadFormat, setDownloadFormat] = React.useState('svg');
  const [downloadSettings, setDownloadSettings] = React.useState({
    scale: 4,
    size: 'xlarge'
  });
  
  // Find the kit data from all categories
  const kitData = useMemo(() => {
    // Search in all categories
    const allKits = [
      ...(kitsData.dataspaceFoundation || []),
      ...(kitsData.industryCoreFoundation || []),
      ...(kitsData.useCases || []),
      // Also search in industry-specific kits
      ...(Object.values(kitsData.industryKits || {}).flat())
    ];
    
    return allKits.find(kit => kit.id === kitId);
    return allKits.find(kit => kit.id === kitId);
  }, [kitId]);

  // Extract gradient colors and compute layer gradients
  const { colors, logoSizePercent } = useMemo(() => {
    if (!kitData) {
      return { colors: null, logoSizePercent: 45 };
    }

    // Helper function to convert rgba to hex
    const rgbaToHex = (rgba) => {
      const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return null;
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    // Extract colors from gradient string (support both hex and rgba)
    let color1, color2;
    
    // Try hex format first
    const hexMatch = kitData.colors.gradient.match(/#[0-9A-Fa-f]{6}/g);
    if (hexMatch && hexMatch.length >= 2) {
      [color1, color2] = hexMatch;
    } else {
      // Try rgba format
      const rgbaMatch = kitData.colors.gradient.match(/rgba?\([^)]+\)/g);
      if (rgbaMatch && rgbaMatch.length >= 2) {
        color1 = rgbaToHex(rgbaMatch[0]);
        color2 = rgbaToHex(rgbaMatch[1]);
      }
    }

    if (!color1 || !color2) {
      console.error(`Unable to extract colors from gradient for kit "${kitData.id}"`);
      return { colors: null, logoSizePercent: 45 };
    }

    // Use the same gradient for all layers - opacity will handle the darkening effect
    const baseGradient = `linear-gradient(45deg, ${color1} 0%, ${color2} 100%)`;
    
    // All layers use the same gradient
    const gradients = [
      baseGradient, // Layer 1 - Top (100% opacity in SCSS)
      baseGradient, // Layer 2 (90% opacity in SCSS)
      baseGradient, // Layer 3 (80% opacity in SCSS)
      baseGradient  // Layer 4 - Bottom (70% opacity in SCSS)
    ];

    // Calculate logo size percentage based on logoWidth/logoHeight
    const avgSize = (kitData.logoWidth + kitData.logoHeight) / 2;
    const logoSize = (avgSize / 80) * 45;

    return {
      colors: {
        primary: kitData.colors.primary, // Use the actual primary color from kit data
        gradients
      },
      logoSizePercent: logoSize
    };
  }, [kitData]);

  // If kit not found, return null or error message
  if (!kitData) {
    console.error(`Kit with ID "${kitId}" not found in kitsData`);
    return null;
  }

  if (!colors) {
    console.error(`Invalid gradient format for kit "${kitId}"`);
    return null;
  }

  const Logo = kitData.logo;

  // Size multipliers based on selected size
  const sizeMultipliers = {
    small: 0.5,
    original: 1,
    large: 2,
    xlarge: 3,
    xxlarge: 4,
    ultra: 6
  };

  // Handle download with current settings
  const handleDownload = async () => {
    if (downloadingFrom === 'dropdown') {
      // Download from dropdown with custom settings
      if (downloadFormat === 'svg') {
        await handleDownloadSVGCustom();
      } else {
        await handleDownloadPNGCustom();
      }
    } else {
      // Main button: always download SVG at original size and quality
      await handleDownloadSVGOriginal();
    }
  };

  // Handle SVG download at original size (for main button)
  const handleDownloadSVGOriginal = async () => {
    if (!containerRef.current) return;
    setIsDownloading(true);
    setDownloadingFrom('main');

    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: null,
        scale: 2, // Fixed quality
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1.0);
      });

      const reader = new FileReader();
      const dataURL = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      
      const width = canvas.width;
      const height = canvas.height;
      
      const svgContent = [
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
        `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`,
        `  <image x="0" y="0" width="${width}" height="${height}" href="${dataURL}"/>`,
        '</svg>'
      ].join('\n');

      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.download = `${kitId}-3d-logo.svg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setIsDownloading(false);
        setDownloadingFrom(null);
      }, 500);
    } catch (error) {
      console.error('Error downloading SVG:', error);
      alert('Failed to download SVG: ' + error.message);
      setIsDownloading(false);
      setDownloadingFrom(null);
    }
  };

  // Handle PNG download functionality with custom settings
  const handleDownloadPNGCustom = async () => {
    if (!containerRef.current) return;
    setIsDownloading(true);
    setDownloadingFrom('dropdown');

    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: null,
        scale: downloadSettings.scale * sizeMultipliers[downloadSettings.size],
        logging: false,
      });

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        }, 'image/png', 1.0);
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${kitId}-3d-logo-${downloadSettings.size}-${downloadSettings.scale}x.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setIsDownloading(false);
        setDownloadingFrom(null);
      }, 500);
    } catch (error) {
      console.error('Error downloading PNG:', error);
      alert('Failed to download PNG: ' + error.message);
      setIsDownloading(false);
      setDownloadingFrom(null);
    }
  };

  // Handle SVG download functionality with custom settings
  const handleDownloadSVGCustom = async () => {
    if (!containerRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: null,
        scale: downloadSettings.scale * sizeMultipliers[downloadSettings.size],
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1.0);
      });

      const reader = new FileReader();
      const dataURL = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      
      const width = canvas.width;
      const height = canvas.height;
      
      const svgContent = [
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
        `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`,
        `  <image x="0" y="0" width="${width}" height="${height}" href="${dataURL}"/>`,
        '</svg>'
      ].join('\n');

      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.download = `${kitId}-3d-logo-${downloadSettings.size}-${downloadSettings.scale}x.svg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setIsDownloading(false);
        setDownloadingFrom(null);
      }, 500);
    } catch (error) {
      console.error('Error downloading SVG:', error);
      alert('Failed to download SVG: ' + error.message);
      setIsDownloading(false);
      setDownloadingFrom(null);
    }
  };

  return (
    <div className={`${styles.logo3dWrapper} ${className}`}>
      {showDownload && (
        <>
          <div className={styles.downloadButtons}>
            {/* Main download button */}
            <button 
              className={`${styles.downloadButton} ${styles.downloadButtonMain}`}
              onClick={() => {
                setDownloadingFrom('main');
                setIsDownloading(true);
                // Use setTimeout to allow React to re-render and show spinner before starting download
                setTimeout(async () => {
                  await handleDownloadSVGOriginal();
                }, 50);
              }}
              title="Download as SVG (original size)"
              aria-label="Download logo"
              disabled={isDownloading}
            >
              {isDownloading && downloadingFrom === 'main' ? (
                <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              )}
            </button>
            
            {/* Dropdown arrow button */}
            <button 
              className={`${styles.downloadButton} ${styles.downloadButtonDropdown}`}
              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
              title="Download options"
              aria-label="Show download options"
              disabled={isDownloading}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
          
          {showDownloadOptions && (
            <div className={styles.downloadOptions}>
              <div className={styles.optionsHeader}>
                <h4>Download Options</h4>
                <button 
                  className={styles.closeButton}
                  onClick={() => setShowDownloadOptions(false)}
                  aria-label="Close options"
                >
                  ×
                </button>
              </div>
              
              <div className={styles.optionGroup}>
                <label>Format:</label>
                <select 
                  value={downloadFormat} 
                  onChange={(e) => setDownloadFormat(e.target.value)}
                >
                  <option value="svg">SVG</option>
                  <option value="png">PNG</option>
                </select>
              </div>
              
              <div className={styles.optionGroup}>
                <label>Size:</label>
                <select 
                  value={downloadSettings.size} 
                  onChange={(e) => setDownloadSettings({...downloadSettings, size: e.target.value})}
                >
                  <option value="small">Small (150x140)</option>
                  <option value="original">Original (300x280)</option>
                  <option value="large">Large (600x560)</option>
                  <option value="xlarge">X-Large (900x840)</option>
                  <option value="xxlarge">2X-Large (1200x1120)</option>
                  <option value="ultra">Ultra (1800x1680)</option>
                </select>
              </div>
              
              <div className={styles.optionGroup}>
                <label>Quality:</label>
                <select 
                  value={downloadSettings.scale} 
                  onChange={(e) => setDownloadSettings({...downloadSettings, scale: Number(e.target.value)})}
                >
                  <option value="2">Standard (2x)</option>
                  <option value="3">High (3x)</option>
                  <option value="4">Ultra (4x)</option>
                  <option value="5">Maximum (5x)</option>
                  <option value="6">Extreme (6x)</option>
                  <option value="8">Print Quality (8x)</option>
                </select>
              </div>
              
              <div className={styles.downloadActions}>
                <button 
                  className={styles.downloadActionButton}
                  onClick={() => {
                    setDownloadingFrom('dropdown');
                    setIsDownloading(true);
                    // Use setTimeout to allow React to re-render and show spinner before starting download
                    setTimeout(async () => {
                      try {
                        if (downloadFormat === 'svg') {
                          await handleDownloadSVGCustom();
                        } else {
                          await handleDownloadPNGCustom();
                        }
                      } finally {
                        setShowDownloadOptions(false);
                      }
                    }, 50);
                  }}
                  disabled={isDownloading}
                >
                  {isDownloading && downloadingFrom === 'dropdown' ? (
                    <>
                      <svg className={styles.spinnerInline} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                      </svg>
                      Downloading...
                    </>
                  ) : (
                    `Download ${downloadFormat.toUpperCase()}`
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={containerRef} className={styles.logo3dContainer}>
        <div className={styles.logo3dInner}>
          {/* Layer 5 - Bottom border only */}
          <div 
            className={`${styles.logo3dLayer} ${styles.layer5}`}
            style={{ borderColor: colors.primary }}
          />

          {/* Layer 4 - Bottom (darkest) */}
          <div 
            className={`${styles.logo3dLayer} ${styles.layer4}`}
            style={{ background: colors.gradients[3] }}
          />

          {/* Border Layer 4b */}
          <div 
            className={`${styles.logo3dLayer} ${styles.layer4b}`}
            style={{ borderColor: colors.primary }}
          />

          {/* Layer 3 */}
          <div 
            className={`${styles.logo3dLayer} ${styles.layer3}`}
            style={{ background: colors.gradients[2] }}
          />

          {/* Border Layer 3b */}
          <div 
            className={`${styles.logo3dLayer} ${styles.layer3b}`}
            style={{ borderColor: colors.primary }}
          />

          {/* Layer 2 */}
          <div 
            className={`${styles.logo3dLayer} ${styles.layer2}`}
            style={{ background: colors.gradients[1] }}
          />

          {/* Border Layer 2b */}
          <div 
            className={`${styles.logo3dLayer} ${styles.layer2b}`}
            style={{ borderColor: colors.primary }}
          />

          {/* Layer 1 - Top (brightest) with logo */}
          <div 
            className={`${styles.logo3dLayer} ${styles.layer1}`}
            style={{ background: colors.gradients[0] }}
          >
            <Logo 
              style={{ 
                width: `${logoSizePercent}%`, 
                height: `${logoSizePercent}%` 
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kit3DLogo;
