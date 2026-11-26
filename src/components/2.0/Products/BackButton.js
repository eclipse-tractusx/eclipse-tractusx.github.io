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

import React from 'react';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import styles from './styles.module.scss';

/**
 * Round back button for the left of a page header. It goes back in the browser history
 * when the visitor came from another page of the site, and to `fallback` (the parent
 * page) when they opened this page directly.
 */
export default function BackButton({ fallback, label = 'Back' }) {
  const history = useHistory();
  const location = useLocation();

  const onClick = (event) => {
    // react-router only gives a key to entries it created, so a key means there is a page to go back to.
    if (location.key && window.history.length > 1) {
      event.preventDefault();
      history.goBack();
    }
  };

  return (
    <Link to={fallback} className={styles.backButton} onClick={onClick} aria-label={label} title={label}>
      <ArrowBackIcon />
    </Link>
  );
}
