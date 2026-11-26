/********************************************************************************
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

// Wraps the Algolia search bar of Docusaurus to pass every search request and its
// response to the analytics (see src/clientModules/analytics.js and ANALYTICS.md).
// Only the number of hits of a response is used, the search term is never sent to
// the analytics.

import React, { useCallback } from 'react';
import SearchBar from '@theme-original/SearchBar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { startSearchRequest, finishSearchRequest } from '@site/src/clientModules/analytics';

export default function SearchBarWrapper(props) {
  const {
    siteMetadata: { docusaurusVersion },
  } = useDocusaurusContext();

  // Replaces the transformSearchClient of the original search bar, so its behavior
  // (identifying Docusaurus to Algolia) is repeated here.
  const transformSearchClient = useCallback(
    (searchClient) => {
      searchClient.addAlgoliaAgent('docusaurus', docusaurusVersion);
      const search = searchClient.search.bind(searchClient);
      searchClient.search = (...args) => {
        // Registered before the request is sent, so the analytics know whether consent
        // was given when it started.
        const request = startSearchRequest();
        return search(...args).then((response) => {
          finishSearchRequest(request, response);
          return response;
        });
      };
      return searchClient;
    },
    [docusaurusVersion],
  );

  return <SearchBar {...props} transformSearchClient={transformSearchClient} />;
}
