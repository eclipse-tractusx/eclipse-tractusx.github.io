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

    // Helper function to darken a color
    const darkenColor = (hex, factor) => {
      const num = parseInt(hex.slice(1), 16);
      const r = Math.floor(((num >> 16) & 0xFF) * factor);
      const g = Math.floor(((num >> 8) & 0xFF) * factor);
      const b = Math.floor((num & 0xFF) * factor);
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    // Create layer gradient with darkening factor
    const createLayerGradient = (c1, c2, factor) => {
      const darkC1 = darkenColor(c1, factor);
      const darkC2 = darkenColor(c2, factor);
      return `linear-gradient(45deg, ${darkC1} 0%, ${darkC2} 100%)`;
    };

    // Generate gradient variations (100%, 75%, 55%, 40%)
    const gradients = [
      `linear-gradient(45deg, ${color1} 0%, ${color2} 100%)`,
      createLayerGradient(color1, color2, 0.75),
      createLayerGradient(color1, color2, 0.55),
      createLayerGradient(color1, color2, 0.40)
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

  // Handle download functionality
  const handleDownload = async () => {
    if (!containerRef.current) return;

    try {
      // Dynamically import html2canvas only when needed
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${kitId}-3d-logo.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className={`${styles.logo3dWrapper} ${className}`}>
      {showDownload && (
        <button 
          className={styles.downloadButton}
          onClick={handleDownload}
          title="Download as PNG"
          aria-label="Download logo as PNG"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      )}
      <div ref={containerRef} className={styles.logo3dContainer}>
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
  );
};

export default Kit3DLogo;
