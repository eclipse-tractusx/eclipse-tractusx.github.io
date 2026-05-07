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
  const [showModal, setShowModal] = React.useState(false);
  const [downloadFormat, setDownloadFormat] = React.useState('svg');
  const [downloadSize, setDownloadSize] = React.useState('large');
  // Progress tracking: { active, progress (0-100), status, error }
  const [dl, setDl] = React.useState({ active: false, progress: 0, status: '', error: null });
  
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
      baseGradient, // Layer 2 (80% opacity in SCSS)
      baseGradient, // Layer 3 (60% opacity in SCSS)
      baseGradient  // Layer 4 - Bottom (40% opacity in SCSS)
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

  // Size presets: label → [width, height]
  const sizePresets = {
    small:  [300, 280],
    medium: [600, 560],
    large:  [1200, 1120],
    xlarge: [2400, 2240],
  };

  /** Trigger a file download from a Blob. */
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  /** Allow React to process state updates between heavy sync steps. */
  const yieldToUI = () => new Promise(resolve => { setTimeout(resolve, 0); });

  /** Main download handler — fetches pre-rendered SVG, optionally rasterises to PNG. */
  const handleDownload = async (format, size) => {
    const onProgress = async (pct, msg) => {
      setDl({ active: true, progress: pct, status: msg, error: null });
      await yieldToUI();
    };

    setDl({ active: true, progress: 0, status: 'Starting...', error: null });
    await yieldToUI();

    try {
      await onProgress(10, 'Fetching pre-rendered logo...');

      const response = await fetch(`/generated/kit-logos/${kitId}.svg`);
      if (!response.ok) throw new Error(`Logo not found (${response.status})`);

      const svgText = await response.text();
      const [outW, outH] = sizePresets[size] || sizePresets.large;

      if (format === 'svg') {
        // Patch the SVG width/height to the requested size
        await onProgress(80, 'Preparing SVG...');
        const resized = svgText
          .replace(/width="\d+"/, `width="${outW}"`)
          .replace(/height="\d+"/, `height="${outH}"`);

        await onProgress(95, 'Downloading...');
        const svgBlob = new Blob([resized], { type: 'image/svg+xml;charset=utf-8' });
        downloadBlob(svgBlob, `${kitId}-3d-logo-${outW}x${outH}.svg`);
      } else {
        // Rasterise SVG → PNG at the requested size via canvas
        await onProgress(30, 'Rasterising to PNG...');

        const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
        const imgUrl = URL.createObjectURL(svgBlob);
        const img = await new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = () => reject(new Error('Failed to rasterise SVG'));
          image.src = imgUrl;
        });

        await onProgress(60, 'Drawing to canvas...');

        const canvas = document.createElement('canvas');
        canvas.width = outW;
        canvas.height = outH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, outW, outH);
        URL.revokeObjectURL(imgUrl);

        await onProgress(80, 'Encoding PNG...');
        const pngBlob = await new Promise((resolve, reject) => {
          canvas.toBlob(b => {
            if (b) resolve(b);
            else reject(new Error('Failed to create PNG'));
          }, 'image/png', 1.0);
        });

        await onProgress(95, 'Downloading...');
        downloadBlob(pngBlob, `${kitId}-3d-logo-${outW}x${outH}.png`);
      }

      setDl({ active: false, progress: 100, status: 'Done!', error: null });
      setTimeout(() => setShowModal(false), 600);
    } catch (error) {
      console.error('Download error:', error);
      setDl({ active: false, progress: 0, status: '', error: error.message });
    }
  };

  /** Quick download: SVG at large size. */
  const handleQuickDownload = () => {
    setShowModal(true);
    setTimeout(() => handleDownload('svg', 'large'), 50);
  };

  return (
    <div className={`${styles.logo3dWrapper} ${className}`}>
      {showDownload && (
        <>
          {/* Download trigger button */}
          <div className={styles.downloadButtons}>
            <button
              className={`${styles.downloadButton} ${styles.downloadButtonMain}`}
              onClick={handleQuickDownload}
              title="Download as SVG (original size)"
              aria-label="Download logo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button
              className={`${styles.downloadButton} ${styles.downloadButtonDropdown}`}
              onClick={() => { setDl({ active: false, progress: 0, status: '', error: null }); setShowModal(true); }}
              title="Download options"
              aria-label="Show download options"
            > 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          {/* Download modal overlay */}
          {showModal && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div className={styles.modalOverlay} onMouseDown={() => { if (!dl.active) setShowModal(false); }}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div className={styles.modalContent} onMouseDown={e => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.modalHeader}>
                  <h4>Download Logo</h4>
                  {!dl.active && (
                    <button
                      className={styles.closeButton}
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Progress section — shown while downloading */}
                {dl.active && (
                  <div className={styles.progressSection}>
                    <div className={styles.progressBarTrack}>
                      <div
                        className={styles.progressBarFill}
                        style={{ width: `${dl.progress}%` }}
                      />
                    </div>
                    <div className={styles.progressInfo}>
                      <span className={styles.progressStatus}>{dl.status}</span>
                      <span className={styles.progressPct}>{dl.progress}%</span>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {dl.error && (
                  <div className={styles.errorMessage}>
                    <span>Download failed: {dl.error}</span>
                    <button
                      className={styles.retryButton}
                      onClick={() => handleDownload(downloadFormat, downloadSize)}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Options — hidden while downloading */}
                {!dl.active && (
                  <>
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
                        value={downloadSize}
                        onChange={(e) => setDownloadSize(e.target.value)}
                      >
                        <option value="small">Small (300×280)</option>
                        <option value="medium">Medium (600×560)</option>
                        <option value="large">Large (1200×1120)</option>
                        <option value="xlarge">Full (2400×2240)</option>
                      </select>
                    </div>

                    <div className={styles.downloadActions}>
                      <button
                        className={styles.downloadActionButton}
                        onClick={() => handleDownload(downloadFormat, downloadSize)}
                      >
                        Download {downloadFormat.toUpperCase()}
                      </button>
                    </div>
                  </>
                )}
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
