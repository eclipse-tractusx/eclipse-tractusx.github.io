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

/**
 * SVGR configuration file.
 *
 * SVGO is disabled because several gallery / logo SVG files embed large
 * base64-encoded image data that exceeds the sax parser's internal buffer
 * limit ("Max buffer length exceeded: attribValue"). Disabling SVGO skips
 * the problematic parse/optimise step entirely while keeping full SVG
 * import functionality.
 *
 * Affected files (as of April 2026):
 *   - static/img/kits/circularity/circularity-kit-gallery.drawio.svg
 *   - static/img/kits/data-trust-and-security/data-trust-and-security-kit-gallery.svg
 *   - static/img/kits/data-trust-and-security/data-trust-and-security-kit-raw-logo.svg
 *   - static/img/kits/eco-pass/eco-pass-kit-gallery.drawio.svg
 *   - static/img/kits/supply-chain-disruption-notification/supply-chain-disruption-notification-kit-gallery.drawio.svg
 */
module.exports = {
  svgo: false,
};

