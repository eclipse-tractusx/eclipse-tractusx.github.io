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

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Close from '@mui/icons-material/Close';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import styles from './styles.module.scss';

/**
 * Full-screen viewer for one photo of the gallery. Closes on Escape, the close
 * button or a click on the backdrop; arrow keys and the side buttons move
 * through the set. Page scrolling is locked while it is open.
 */
const Lightbox = ({ photos, index, onClose, onNavigate }) => {
  const photo = photos[index];
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate(1);
      if (event.key === 'ArrowLeft') onNavigate(-1);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onNavigate]);

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className={`${styles.lightboxButton} ${styles.closeButton}`}
        onClick={onClose}
        aria-label="Close"
      >
        <Close />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.lightboxButton} ${styles.prevButton}`}
            onClick={(event) => { event.stopPropagation(); onNavigate(-1); }}
            aria-label="Previous photo"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className={`${styles.lightboxButton} ${styles.nextButton}`}
            onClick={(event) => { event.stopPropagation(); onNavigate(1); }}
            aria-label="Next photo"
          >
            <ChevronRight />
          </button>
        </>
      )}

      <figure className={styles.lightboxFigure} onClick={(event) => event.stopPropagation()}>
        <img src={photo.src} alt={photo.alt} className={styles.lightboxImage} />
        {(photo.caption || photos.length > 1) && (
          <figcaption className={styles.lightboxCaption}>
            {photo.caption}
            {photos.length > 1 && (
              <span className={styles.lightboxCounter}>{index + 1} / {photos.length}</span>
            )}
          </figcaption>
        )}
      </figure>
    </div>
  );
};

/**
 * Photo gallery for blog posts: an optional wide lead photo followed by a
 * responsive grid of thumbnails. Every photo opens full-screen on click.
 *
 * @param {{src: string, alt: string, caption?: string}} [lead]  - photo shown full-width above the grid
 * @param {{src: string, alt: string, caption?: string}[]} photos - photos shown in the grid
 */
export default function PhotoGallery({ lead, photos = [] }) {
  const all = lead ? [lead, ...photos] : photos;
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const navigate = useCallback(
    (step) => setOpenIndex((current) => (current + step + all.length) % all.length),
    [all.length],
  );

  const renderPhoto = (photo, index, className) => (
    <figure key={photo.src} className={className}>
      <button
        type="button"
        className={styles.thumbButton}
        onClick={() => setOpenIndex(index)}
        aria-label={`Open photo full-screen: ${photo.alt}`}
      >
        <img src={photo.src} alt={photo.alt} loading={index === 0 ? 'eager' : 'lazy'} />
      </button>
      {photo.caption && <figcaption className={styles.caption}>{photo.caption}</figcaption>}
    </figure>
  );

  return (
    <div className={styles.gallery}>
      {lead && renderPhoto(lead, 0, styles.lead)}
      {photos.length > 0 && (
        <div className={styles.grid}>
          {photos.map((photo, i) => renderPhoto(photo, lead ? i + 1 : i, styles.item))}
        </div>
      )}
      {openIndex !== null && (
        <Lightbox photos={all} index={openIndex} onClose={close} onNavigate={navigate} />
      )}
    </div>
  );
}
