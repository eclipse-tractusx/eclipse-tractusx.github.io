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

import { useEffect } from 'react';

/**
 * Moves the element behind a header slower than the page while it scrolls, so the
 * background drifts behind the content. `speed` is the share of the scroll distance the
 * background follows (0 = fixed to the header, 1 = fixed to the window). Off for people
 * who ask for reduced motion, and paused once the header is out of view.
 */
export default function useParallax(ref, speed = 0.4) {
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      // The header opens the page, so the page scroll is how far it has moved up.
      if (element.parentElement.getBoundingClientRect().bottom < 0) return;
      element.style.transform = `translate3d(0, ${(window.scrollY * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
      element.style.transform = '';
    };
  }, [ref, speed]);
}
