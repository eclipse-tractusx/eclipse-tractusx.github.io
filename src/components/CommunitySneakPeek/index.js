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

import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import Groups from '@mui/icons-material/Groups';
import Mic from '@mui/icons-material/Mic';
import Construction from '@mui/icons-material/Construction';
import EmojiObjects from '@mui/icons-material/EmojiObjects';
import Handshake from '@mui/icons-material/Handshake';
import Campaign from '@mui/icons-material/Campaign';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import styles from './styles.module.scss';

// Aftermovie of the Sixth Eclipse Tractus-X Community Days (July 2026, ARENA2036).
const VIDEO_ID = 'pXpXXMuLmJ8';
const VIDEO_TITLE = 'Sixth Eclipse Tractus-X Community Days at ARENA2036 – Aftermovie';

// Poster candidates, best resolution first — not every video has a maxres still.
const POSTERS = [
  `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`,
];

const HIGHLIGHTS = [
  { icon: Mic, label: 'Keynotes & tech talks' },
  { icon: Construction, label: 'Hands-on workshops' },
  { icon: EmojiObjects, label: 'Coding challenges' },
  { icon: Groups, label: 'A global open-source community' },
];

/**
 * Click-to-play facade: the YouTube player is only loaded once a visitor asks
 * for it, so the homepage does not pull in the embed on every single visit.
 */
const CommunityVideo = () => {
  const [playing, setPlaying] = useState(false);
  const [posterIndex, setPosterIndex] = useState(0);

  if (playing) {
    return (
      <iframe
        className={styles.videoFrame}
        src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
        title={VIDEO_TITLE}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className={styles.videoFacade}
      onClick={() => setPlaying(true)}
      aria-label={`Play the aftermovie: ${VIDEO_TITLE}`}
    >
      <img
        src={POSTERS[posterIndex]}
        alt=""
        loading="lazy"
        // Fall back to the next-best still; stops at the last candidate.
        onError={() => setPosterIndex(index => Math.min(index + 1, POSTERS.length - 1))}
      />
      <span className={styles.playButton}>
        <PlayArrowRounded />
      </span>
      <span className={styles.videoLabel}>Aftermovie · Sixth Community Days · July 2026</span>
    </button>
  );
};

/**
 * "Sneak peek" section on the homepage: the Community Days aftermovie plus the
 * open invitation to our Office Hours, where the community days updates
 * (registration, agenda, speakers) and every call for talks, workshops,
 * challenges and sponsors land first.
 */
export default function CommunitySneakPeek() {
  return (
    <section className={styles.sneakPeekSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.eyebrow}>
              <PlayArrowRounded /> Sneak Peek
            </span>

            <h2 className={styles.title}>A Deep View Into Our Community</h2>

            <p className={styles.description}>
              Two days, contributors from all over the world, and one shared goal: making data
              spaces work — together. Watch the aftermovie of our Sixth Community Days at
              ARENA2036 and get a feeling for what is waiting for you in Stuttgart this December.
            </p>

            <ul className={styles.highlights}>
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Icon /> {label}
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Link
                to="https://eclipse-tractusx.github.io/community/open-meetings#community-office-hour"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                <Groups /> Join our Office Hours
              </Link>
              <Link
                to="/blog/community-days-12-2026"
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                <CalendarMonth /> Community Days, Dec 3–4
              </Link>
            </div>
          </div>

          <div className={styles.videoColumn}>
            <CommunityVideo />
          </div>
        </div>

        {/* Update the first notice once registration for the Community Days opens. */}
        <div className={styles.notices}>
          <p className={styles.notice}>
            <Campaign />
            <span>
              <strong>Stay tuned!</strong> Registration for the Seventh Community Days is not
              open yet — we announce the registration start, the agenda and the confirmed
              speakers first in our Community Office Hour, every Friday at 10:05 (Europe/Berlin).
            </span>
          </p>
          <p className={styles.notice}>
            <Handshake />
            <span>
              <strong>Want to be part of the program?</strong> We are looking for talks,
              workshops, coding challenges — and for sponsors. Bring your idea to the Office
              Hour, everyone is welcome and no registration is needed.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
