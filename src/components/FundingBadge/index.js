/*********************************************************************************
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
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

import React, { useEffect, useId, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';

/**
 * Public funding a project or event received. The official logo carries its
 * own German wording ("Gefördert durch … aufgrund eines Beschlusses des
 * Deutschen Bundestages"), so the caption next to it gives the English summary.
 */
export const FUNDERS = {
  bmwe: {
    logo: '/img/funding/bmwe-gefoerdert.png',
    alt: 'Gefördert durch: Bundesministerium für Wirtschaft und Energie, aufgrund eines Beschlusses des Deutschen Bundestages',
    label: 'Supported by the German Federal Ministry for Economic Affairs and Energy (BMWE)',
    amount: '€10 million',
  },
};

/**
 * Funding badge — the funder's official logo on a white plate (the logo must
 * stay on white, also in dark mode) with an English caption. The badge is a
 * trigger: hovering, focusing or clicking it reveals the funding amount.
 *
 * @param {string} funder - Key of FUNDERS (default: 'bmwe')
 * @param {boolean} compact - Smaller variant for event cards
 * @param {boolean} showAmount - Reveal the funding amount on hover, focus or click (default: true)
 * @param {string} className - Extra class, e.g. to adjust the spacing
 */
export default function FundingBadge({ funder = 'bmwe', compact = false, showAmount = true, className = '' }) {
  const config = FUNDERS[funder];
  const logo = useBaseUrl(config?.logo);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const rootRef = useRef(null);
  const popoverId = useId();

  // A click pins the popover open; close it again on an outside click or Escape.
  useEffect(() => {
    if (!pinned) return undefined;
    const close = () => {
      setPinned(false);
      setOpen(false);
    };
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) close();
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [pinned]);

  if (!config) return null;

  const hasAmount = showAmount && Boolean(config.amount);
  const content = (
    <>
      <span className={styles.logoPlate}>
        <img src={logo} alt={config.alt} className={styles.logo} />
      </span>
      <span className={styles.label}>{config.label}</span>
    </>
  );

  if (!hasAmount) {
    return <div className={`${styles.badge} ${compact ? styles.compact : ''} ${className}`}>{content}</div>;
  }

  return (
    <div
      ref={rootRef}
      className={`${styles.wrapper} ${compact ? styles.compactWrapper : ''} ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => !pinned && setOpen(false)}
    >
      <button
        type="button"
        className={`${styles.badge} ${styles.trigger} ${compact ? styles.compact : ''}`}
        aria-expanded={open}
        aria-controls={popoverId}
        onClick={() => {
          const next = !pinned;
          setPinned(next);
          setOpen(next);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => !pinned && setOpen(false)}
      >
        {content}
      </button>
      <div id={popoverId} role="tooltip" className={styles.popover} hidden={!open}>
        <span className={styles.amountLabel}>Funding amount</span>
        <span className={styles.amount}>{config.amount}</span>
      </div>
    </div>
  );
}
