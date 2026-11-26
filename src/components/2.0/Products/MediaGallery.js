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

import React, { useCallback, useEffect, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import styles from './detail.module.scss';

function Thumb({ shot, onOpen }) {
  const src = useBaseUrl(shot.src);
  return (
    <button type="button" className={styles.thumb} onClick={onOpen} aria-label={`Enlarge: ${shot.alt}`}>
      <img src={src} alt={shot.alt} loading="lazy" />
      {shot.caption && <span className={styles.thumbCaption}>{shot.caption}</span>}
    </button>
  );
}

function Lightbox({ shots, index, onClose, onMove }) {
  const shot = shots[index];
  const src = useBaseUrl(shot.src);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onMove(1);
      if (event.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onMove]);

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={shot.alt} onClick={onClose}>
      <figure className={styles.lightboxFigure} onClick={(event) => event.stopPropagation()}>
        <img src={src} alt={shot.alt} />
        <figcaption>
          {shot.caption || shot.alt}
          <span className={styles.lightboxCount}>
            {index + 1} / {shots.length}
          </span>
        </figcaption>
      </figure>
      <button type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Close">
        <CloseIcon />
      </button>
      {shots.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(event) => {
              event.stopPropagation();
              onMove(-1);
            }}
            aria-label="Previous screenshot"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(event) => {
              event.stopPropagation();
              onMove(1);
            }}
            aria-label="Next screenshot"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}
    </div>
  );
}

function Video({ video }) {
  const src = useBaseUrl(video.src || '');
  return (
    <figure className={styles.video}>
      {video.youtube ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtube}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video src={src} controls preload="metadata" />
      )}
      <figcaption>{video.title}</figcaption>
    </figure>
  );
}

export default function MediaGallery({ screenshots = [], videos = [] }) {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (step) => setOpen((current) => (current + step + screenshots.length) % screenshots.length),
    [screenshots.length],
  );

  return (
    <div className={styles.media}>
      {screenshots.length > 0 && (
        <div className={styles.thumbs}>
          {screenshots.map((shot, index) => (
            <Thumb key={shot.src} shot={shot} onOpen={() => setOpen(index)} />
          ))}
        </div>
      )}
      {videos.length > 0 && (
        <div className={styles.videos}>
          {videos.map((video) => (
            <Video key={video.youtube || video.src} video={video} />
          ))}
        </div>
      )}
      {open !== null && <Lightbox shots={screenshots} index={open} onClose={close} onMove={move} />}
    </div>
  );
}
